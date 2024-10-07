package server.haengdong.application;

import static software.amazon.awssdk.core.sync.RequestBody.fromInputStream;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import server.haengdong.application.response.ImageNameAppResponse;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Slf4j
@RequiredArgsConstructor
@Service
public class ImageUploadService {

    private static final String BUCKET_NAME = "techcourse-project-2024";
    private static final String DIRECTORY_PATH = "haeng-dong/s3-upload-test/";

    private final S3Client s3Client;

    public List<ImageNameAppResponse> uploadImages(List<MultipartFile> images) {
        return images.stream()
                .map(this::uploadImage)
                .toList();
    }

    private ImageNameAppResponse uploadImage(MultipartFile image) {
        try (InputStream inputStream = image.getInputStream()) {
            String fileName = uploadImageToStorage(inputStream, image);
            return new ImageNameAppResponse(fileName);
        } catch (IOException e) {
            throw new HaengdongException(HaengdongErrorCode.IMAGE_UPLOAD_FAIL);
        }
    }

    private String uploadImageToStorage(InputStream inputStream, MultipartFile image) {
        String fileName = UUID.randomUUID() + image.getOriginalFilename();
        String key = DIRECTORY_PATH + fileName;
        long contentLength = image.getSize();

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(BUCKET_NAME)
                .key(key)
                .contentLength(contentLength)
                .contentType(image.getContentType())
                .build();

        s3Client.putObject(putObjectRequest, fromInputStream(inputStream, contentLength));
        return fileName;
    }
}
