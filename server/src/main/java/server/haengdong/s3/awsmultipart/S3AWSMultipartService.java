package server.haengdong.s3.awsmultipart;

import java.net.URL;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.CompleteMultipartUploadRequest;
import software.amazon.awssdk.services.s3.model.CompletedMultipartUpload;
import software.amazon.awssdk.services.s3.model.CompletedPart;
import software.amazon.awssdk.services.s3.model.CreateMultipartUploadRequest;
import software.amazon.awssdk.services.s3.model.CreateMultipartUploadResponse;
import software.amazon.awssdk.services.s3.model.UploadPartRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedUploadPartRequest;

@Service
public class S3AWSMultipartService {

    private final S3Client s3Client;
    private final S3Presigner s3Presigner;

    public S3AWSMultipartService(S3Client s3Client, S3Presigner s3Presigner) {
        this.s3Client = s3Client;
        this.s3Presigner = s3Presigner;
    }

    public String createMultipartUpload(String bucketName, String key) {
        CreateMultipartUploadRequest createMultipartUploadRequest = CreateMultipartUploadRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentType("image/png")
                .build();

        CreateMultipartUploadResponse response = s3Client.createMultipartUpload(createMultipartUploadRequest);
        return response.uploadId();
    }

    public List<URL> generatePresignedUrls(String bucketName, String key, String uploadId, int partCount) {
        List<URL> presignedUrls = new ArrayList<>();

        for (int i = 1; i <= partCount; i++) {
            UploadPartRequest uploadPartRequest = UploadPartRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .uploadId(uploadId)
                    .partNumber(i)
                    .build();

            PresignedUploadPartRequest presignedRequest = s3Presigner.presignUploadPart(r -> r
                    .signatureDuration(Duration.ofMinutes(15))
                    .uploadPartRequest(uploadPartRequest)
            );

            presignedUrls.add(presignedRequest.url());
        }

        return presignedUrls;
    }

    public List<CompletedPart> getCompletedParts(List<String> eTags) {
        List<CompletedPart> completedParts = new ArrayList<>();

        for (int i = 0; i < eTags.size(); i++) {
            CompletedPart part = CompletedPart.builder()
                    .partNumber(i + 1)
                    .eTag(eTags.get(i))
                    .build();
            completedParts.add(part);
        }

        return completedParts;
    }

    public void completeMultipartUpload(String bucketName, String key, String uploadId, List<CompletedPart> completedParts) {
        CompleteMultipartUploadRequest completeMultipartUploadRequest = CompleteMultipartUploadRequest.builder()
                .bucket(bucketName)
                .key(key)
                .uploadId(uploadId)
                .multipartUpload(CompletedMultipartUpload.builder().parts(completedParts).build())
                .build();

        s3Client.completeMultipartUpload(completeMultipartUploadRequest);
    }
}
