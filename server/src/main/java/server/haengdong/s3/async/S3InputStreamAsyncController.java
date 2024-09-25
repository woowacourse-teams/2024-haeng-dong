package server.haengdong.s3.async;

import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;
import java.util.concurrent.CompletableFuture;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class S3InputStreamAsyncController {

    private final S3InputStreamAsyncUploadService s3InputStreamAsyncUploadService;

    public S3InputStreamAsyncController(S3InputStreamAsyncUploadService s3InputStreamAsyncUploadService) {
        this.s3InputStreamAsyncUploadService = s3InputStreamAsyncUploadService;
    }

    @PostMapping("/api/s3/stream-async")
    public CompletableFuture<ResponseEntity<String>> uploadFileByStream(HttpServletRequest request) {
        try {
            InputStream inputStream = request.getInputStream();
            long contentLength = request.getContentLengthLong();
            String directoryPath = "haeng-dong/s3-upload-test/"; // 원하는 디렉토리 경로

            String fileName = request.getHeader("file-name");
            if (fileName == null || fileName.isEmpty()) {
                fileName = "default-file-name";
            }

            String dir = directoryPath + fileName;

            return s3InputStreamAsyncUploadService.uploadFile("techcourse-project-2024", dir, inputStream, contentLength)
                    .thenApply(key -> new ResponseEntity<>("File uploaded successfully: " + key, HttpStatus.OK))
                    .exceptionally(e -> new ResponseEntity<>("File upload failed: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
        } catch (IOException e) {
            CompletableFuture<ResponseEntity<String>> future = new CompletableFuture<>();
            future.complete(new ResponseEntity<>("File upload failed: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
            return future;
        }
    }
}
