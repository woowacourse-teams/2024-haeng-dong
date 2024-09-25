package server.haengdong.s3.freesigned;

import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import software.amazon.awssdk.services.s3.model.CompletedPart;

@RestController
public class S3UploadFreeController {

    private static final String BUCKET_NAME = "techcourse-project-2024";
    public static final String KEY_PREFIX = "haeng-dong/s3-upload-test/";
    private final S3UploadFreeService s3UploadService;

    public S3UploadFreeController(S3UploadFreeService s3UploadService) {
        this.s3UploadService = s3UploadService;
    }

    @PostMapping("/api/s3/free/start")
    public ResponseEntity<Map<String, Object>> startMultipartUpload(
            @RequestParam String fileName,
            @RequestParam int partCount
    ) throws MalformedURLException, URISyntaxException {
        String key = KEY_PREFIX + fileName;
        String uploadId = s3UploadService.createMultipartUpload(BUCKET_NAME, key);
        List<URL> presignedUrls = s3UploadService.generatePresignedUrls(BUCKET_NAME, key, uploadId, partCount);

        Map<String, Object> response = Map.of(
                "uploadId", uploadId,
                "presignedUrls", presignedUrls
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/api/s3/free/complete")
    public ResponseEntity<String> completeMultipartUpload(
            @RequestParam String fileName,
            @RequestParam String uploadId,
            @RequestBody List<String> eTags
    ) {
        String key = KEY_PREFIX + fileName;
        List<CompletedPart> completedParts = s3UploadService.getCompletedParts(eTags);
        s3UploadService.completeMultipartUpload(BUCKET_NAME, key, uploadId, completedParts);

        return new ResponseEntity<>("Multipart upload completed successfully", HttpStatus.OK);
    }
}
