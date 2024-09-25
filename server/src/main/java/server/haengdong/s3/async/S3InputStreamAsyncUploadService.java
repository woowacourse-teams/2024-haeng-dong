package server.haengdong.s3.async;

import java.io.InputStream;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.async.AsyncRequestBody;
import software.amazon.awssdk.services.s3.S3AsyncClient;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class S3InputStreamAsyncUploadService {

    private final S3AsyncClient s3AsyncClient;
    private final ExecutorService executorService;

    public S3InputStreamAsyncUploadService(S3AsyncClient s3AsyncClient, ExecutorService executorService) {
        this.s3AsyncClient = s3AsyncClient;
        this.executorService = executorService;
    }

    public CompletableFuture<String> uploadFile(String bucketName, String key, InputStream inputStream, long contentLength) {
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentLength(contentLength) // contentLength 추가
                .contentType("image/png")
                .build();

        AsyncRequestBody requestBody = AsyncRequestBody.fromInputStream(inputStream, contentLength, executorService);

        CompletableFuture<String> future = s3AsyncClient.putObject(putObjectRequest, requestBody)
                .thenApply(response -> key);

        // 업로드 완료 후 ExecutorService를 종료하거나, 애플리케이션 종료 시점에 종료
        future.whenComplete((response, exception) -> {
            // 예외 처리 로직 추가 가능
            if (exception != null) {
                // 업로드 실패 시 처리
            }
            // 필요에 따라 ExecutorService를 종료
            // executorService.shutdown();
        });

        return future;
    }

    // 애플리케이션 종료 시 ExecutorService를 종료
    public void shutdown() {
        executorService.shutdown();
    }
}
