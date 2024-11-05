package server.haengdong.application;

import static software.amazon.awssdk.core.sync.RequestBody.fromInputStream;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Slf4j
@RequiredArgsConstructor
@Service
public class ImageService {

    @Value("${image.bucket}")
    private String bucketName;

    @Value("${image.directory}")
    private String directoryPath;

    private final S3Client s3Client;
    private final ExecutorService executorService;

    public List<String> uploadImages(List<MultipartFile> images) {
        List<CompletableFuture<String>> futures = images.stream()
                .map(image -> CompletableFuture.supplyAsync(() -> uploadImage(image), executorService))
                .toList();

        CompletableFuture<List<String>> result = CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
                .thenApply(v -> futures.stream()
                        .map(this::getFuture)
                        .toList());

        return result.join();
    }

    private String uploadImage(MultipartFile image) {
        try (InputStream inputStream = image.getInputStream()) {
            return uploadImageToStorage(inputStream, image);
        } catch (IOException e) {
            throw new HaengdongException(HaengdongErrorCode.IMAGE_UPLOAD_FAIL, e);
        }
    }

    private String uploadImageToStorage(InputStream inputStream, MultipartFile image) {
        String imageName = UUID.randomUUID() + image.getOriginalFilename();
        String key = directoryPath + imageName;
        long contentLength = image.getSize();

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentLength(contentLength)
                .contentType(image.getContentType())
                .build();

        s3Client.putObject(putObjectRequest, fromInputStream(inputStream, contentLength));
        return imageName;
    }

    private String getFuture(CompletableFuture<String> future) {
        try {
            return future.get();
        } catch (InterruptedException | ExecutionException e) {
            throw new HaengdongException(HaengdongErrorCode.IMAGE_UPLOAD_FAIL, e);
        }
    }

    public void deleteImage(String imageName) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(directoryPath + imageName)
                .build();

        s3Client.deleteObject(deleteObjectRequest);
    }
}
