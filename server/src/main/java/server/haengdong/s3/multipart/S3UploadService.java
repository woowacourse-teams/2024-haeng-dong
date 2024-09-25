package server.haengdong.s3.multipart;

import java.io.InputStream;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Component
public class S3UploadService {

    private final S3Client s3;

    public S3UploadService(S3Client s3) {
        this.s3 = s3;
    }

    public void uploadImageToS3(String bucketName, String key, InputStream inputStream, long contentLength) {
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentLength(contentLength) // contentLength 추가
                .contentType("image/png")
                .build();

        s3.putObject(putObjectRequest, RequestBody.fromInputStream(inputStream, contentLength));
    }
}
