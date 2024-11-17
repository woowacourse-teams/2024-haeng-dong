package haengdong.event.application;

import haengdong.event.application.response.EventImageAppResponse;
import haengdong.event.application.response.EventImageUrlAppResponse;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;
import java.util.concurrent.ExecutorService;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import haengdong.event.application.response.EventImageSaveAppResponse;
import haengdong.event.application.response.ImageInfo;
import haengdong.common.exception.HaengdongErrorCode;
import haengdong.common.exception.HaengdongException;

@RequiredArgsConstructor
@Service
public class EventImageFacadeService {

    private final EventService eventService;
    private final ImageService imageService;
    private final ExecutorService executorService;

    public void uploadImages(String token, List<MultipartFile> images) {
        List<EventImageSaveAppResponse> imageNames = eventService.saveImages(token, getOriginalNames(images));
        List<CompletableFuture<String>> futures = createFutures(images, imageNames);
        CompletableFuture<List<String>> allFutures = createAllFutures(token, futures, imageNames);

        try {
            allFutures.join();
        } catch (CompletionException e) {
            throw new HaengdongException(HaengdongErrorCode.IMAGE_UPLOAD_FAIL, e);
        }
    }

    private List<CompletableFuture<String>> createFutures(
            List<MultipartFile> images, List<EventImageSaveAppResponse> imageNames
    ) {
        return IntStream.range(0, imageNames.size())
                .mapToObj(i -> CompletableFuture.supplyAsync(() -> {
                    imageService.uploadImage(images.get(i), imageNames.get(i).name());
                    return imageNames.get(i).name();
                }, executorService))
                .toList();
    }

    private CompletableFuture<List<String>> createAllFutures(
            String token, List<CompletableFuture<String>> futures, List<EventImageSaveAppResponse> imageNames
    ) {
        return CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
                .thenApply(v -> applyFutures(futures))
                .exceptionally(ex -> {
                    eventService.deleteImages(token, getImageIds(imageNames));
                    getSuccessUploadImages(futures).forEach(imageService::deleteImage);

                    throw new HaengdongException(HaengdongErrorCode.IMAGE_UPLOAD_FAIL, ex);
                });
    }

    private List<String> applyFutures(List<CompletableFuture<String>> futures) {
        return futures.stream()
                .map(CompletableFuture::join)
                .toList();
    }

    private List<String> getSuccessUploadImages(List<CompletableFuture<String>> futures) {
        return futures.stream()
                .filter(future -> future.isDone() && !future.isCompletedExceptionally())
                .map(CompletableFuture::join)
                .toList();
    }

    private List<String> getOriginalNames(List<MultipartFile> images) {
        return images.stream()
                .map(MultipartFile::getOriginalFilename)
                .toList();
    }

    private List<Long> getImageIds(List<EventImageSaveAppResponse> imageNames) {
        return imageNames.stream()
                .map(EventImageSaveAppResponse::id)
                .toList();
    }

    public void deleteImage(String token, Long imageId) {
        String imageName = eventService.deleteImage(token, imageId);
        imageService.deleteImage(imageName);
    }

    @Scheduled(cron = "0 0 0 * * MON")
    public void removeUnmatchedImage() {
        Instant endDate = Instant.now().minus(1, ChronoUnit.DAYS);

        List<EventImageSaveAppResponse> savedEventImages = eventService.findImagesDateBefore(endDate);
        List<ImageInfo> foundImages = imageService.findImages();

        removeImageNotInS3(savedEventImages, foundImages);
        removeImageNotInRepository(savedEventImages, foundImages);
    }

    private void removeImageNotInS3(List<EventImageSaveAppResponse> eventImages, List<ImageInfo> images) {
        Set<String> imageNames = images.stream()
                .map(ImageInfo::name)
                .collect(Collectors.toSet());

        eventImages.stream()
                .filter(eventImage -> !imageNames.contains(eventImage.name()))
                .map(EventImageSaveAppResponse::id)
                .forEach(eventService::deleteImage);
    }

    private void removeImageNotInRepository(List<EventImageSaveAppResponse> eventImages, List<ImageInfo> images) {
        Set<String> imageNames = eventImages.stream()
                .map(EventImageSaveAppResponse::name)
                .collect(Collectors.toSet());

        images.stream()
                .filter(imageInfo -> imageInfo.createAt().isBefore(Instant.now().minus(2, ChronoUnit.DAYS)))
                .map(ImageInfo::name)
                .filter(name -> !imageNames.contains(name))
                .forEach(imageService::deleteImage);
    }

    public List<EventImageUrlAppResponse> findImages(String token) {
        List<EventImageAppResponse> images = eventService.findImages(token);
        String baseUrl = imageService.getBaseUrl();

        return images.stream()
                .map(image -> new EventImageUrlAppResponse(image.id(), baseUrl + image.name()))
                .toList();
    }
}
