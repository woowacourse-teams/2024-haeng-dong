package server.haengdong.s3.multipart;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.async.AsyncRequestBody;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3AsyncClient;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Component
public class S3UploadService {

    private final S3Client s3Client;
    private final S3AsyncClient s3AsyncClient;
    private final ExecutorService executorService;

    public S3UploadService(S3Client s3Client, S3AsyncClient s3AsyncClient, ExecutorService executorService) {
        this.s3Client = s3Client;
        this.s3AsyncClient = s3AsyncClient;
        this.executorService = executorService;
    }

    public void uploadImageToS3(String bucketName, String key, InputStream inputStream, long contentLength) {
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentLength(contentLength) // contentLength 추가
                .contentType("image/png")
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(inputStream, contentLength));
    }

    public void uploadImageToS3sAsync(String bucketName, List<MultipartFile> multipartFiles) {
        String directoryPath = "haeng-dong/s3-upload-test/";

        // CompletableFuture 리스트 생성
        List<CompletableFuture<?>> futures = multipartFiles.stream()
                .map(file -> {
                    try (InputStream inputStream = file.getInputStream()) {
                        long contentLength = file.getSize(); // 파일 크기 가져오기
                        System.out.println("contentLength = " + contentLength);

                        // S3에 업로드할 객체 정보 생성
                        String key = directoryPath + file.getOriginalFilename();

                        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                                .bucket(bucketName)
                                .key(key)
                                .contentLength(contentLength)
                                .contentType(file.getContentType()) // MultipartFile에서 Content-Type 가져오기
                                .build();

                        // 비동기 클라이언트를 이용해 비동기 요청 실행
                        return s3AsyncClient.putObject(
                                putObjectRequest,
                                AsyncRequestBody.fromInputStream(inputStream, contentLength, executorService)
                        ).whenComplete((response, exception) -> {
                            if (exception != null) {
                                System.err.println("Failed to upload file: " + exception.getMessage());
                                exception.printStackTrace();
                            } else {
                                System.out.println("File uploaded successfully. ETag: " + response.eTag());
                            }
                        });

                    } catch (IOException e) {
                        e.printStackTrace();
                        return CompletableFuture.failedFuture(e); // 에러 발생 시 실패한 future 반환
                    }
                }).collect(Collectors.toList()); // 각 요청을 CompletableFuture 리스트로 수집

        // 모든 비동기 작업이 완료될 때까지 기다림
        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
                .thenRun(() -> System.out.println("All files uploaded successfully."));
    }
}
