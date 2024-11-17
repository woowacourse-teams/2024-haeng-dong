package haengdong.event.application;

import static software.amazon.awssdk.core.sync.RequestBody.fromInputStream;

import haengdong.common.exception.HaengdongErrorCode;
import haengdong.common.exception.HaengdongException;
import haengdong.event.application.response.ImageInfo;
import haengdong.event.properties.ImageProperties;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.retry.annotation.Retryable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Request;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Response;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Slf4j
@RequiredArgsConstructor
@EnableConfigurationProperties(ImageProperties.class)
@Service
public class ImageService {

    private final ImageProperties imageProperties;
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
        String key = imageProperties.directory() + imageName;
        long contentLength = image.getSize();

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(imageProperties.bucket())
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
                .bucket(imageProperties.bucket())
                .key(imageProperties.directory() + imageName)
                .build();

        s3Client.deleteObject(deleteObjectRequest);
        return CompletableFuture.completedFuture(null);
    }

    public List<ImageInfo> findImages() {
        ListObjectsV2Request request = ListObjectsV2Request.builder()
                .bucket(imageProperties.bucket())
                .prefix(imageProperties.directory())
                .build();

        ListObjectsV2Response response = s3Client.listObjectsV2(request);

        return response.contents().stream()
                .map(s3Object -> new ImageInfo(
                        s3Object.key().substring(imageProperties.directory().length()),
                        s3Object.lastModified()
                ))
                .toList();
    }

    public String getBaseUrl() {
        return imageProperties.baseUrl();
    }
}
