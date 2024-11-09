package server.haengdong.application;

import static software.amazon.awssdk.core.sync.RequestBody.fromInputStream;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.retry.annotation.Retryable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import server.haengdong.application.response.ImageInfo;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Request;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Response;
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

    @Retryable
    public void uploadImage(MultipartFile image, String imageName) {
        try (InputStream inputStream = image.getInputStream()) {
            uploadImageToStorage(inputStream, image, imageName);
        } catch (IOException e) {
            throw new HaengdongException(HaengdongErrorCode.IMAGE_UPLOAD_FAIL, e);
        }
    }

    private void uploadImageToStorage(InputStream inputStream, MultipartFile image, String imageName) {
        String key = directoryPath + imageName;
        long contentLength = image.getSize();

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentLength(contentLength)
                .contentType(image.getContentType())
                .build();

        s3Client.putObject(putObjectRequest, fromInputStream(inputStream, contentLength));
    }

    @Async
    @Retryable
    public CompletableFuture<Void> deleteImage(String imageName) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(directoryPath + imageName)
                .build();

        s3Client.deleteObject(deleteObjectRequest);
        return CompletableFuture.completedFuture(null);
    }

    public List<ImageInfo> findImages() {
        ListObjectsV2Request request = ListObjectsV2Request.builder()
                .bucket(bucketName)
                .prefix(directoryPath)
                .build();

        ListObjectsV2Response response = s3Client.listObjectsV2(request);

        return response.contents().stream()
                .map(s3Object -> new ImageInfo(
                        s3Object.key().substring(directoryPath.length()),
                        s3Object.lastModified()
                ))
                .toList();
    }
}
