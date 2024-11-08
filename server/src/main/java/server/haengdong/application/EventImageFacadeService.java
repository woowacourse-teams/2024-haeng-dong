    package server.haengdong.application;

    import java.util.List;
    import java.util.concurrent.CompletableFuture;
    import java.util.concurrent.CompletionException;
    import java.util.concurrent.ExecutorService;
    import java.util.stream.IntStream;
    import lombok.RequiredArgsConstructor;
    import org.springframework.stereotype.Service;
    import org.springframework.web.multipart.MultipartFile;
    import server.haengdong.application.response.EventImageSaveAppResponse;
    import server.haengdong.exception.HaengdongErrorCode;
    import server.haengdong.exception.HaengdongException;

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
    }
