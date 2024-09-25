package server.haengdong.s3.multipart;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class S3MultipartController {

    private final S3UploadService s3UploadService;

    public S3MultipartController(S3UploadService s3UploadService) {
        this.s3UploadService = s3UploadService;
    }

    @PostMapping("/api/s3/multipart-files")
    public String uploadMultipleFiles(
            @RequestPart("uploadFiles") List<MultipartFile> multipartFiles) {
        String directoryPath = "haeng-dong/s3-upload-test/"; // 원하는 디렉토리 경로

        for (MultipartFile file : multipartFiles) {
            try (InputStream inputStream = file.getInputStream()) {
                long contentLength = file.getSize(); // 파일 크기 가져오기
                System.out.println("contentLength = " + contentLength);
                // S3에 업로드 (key에 디렉토리 경로 포함)
                String key = directoryPath + file.getOriginalFilename(); // 디렉토리 경로와 파일명 결합
                s3UploadService.uploadImageToS3("techcourse-project-2024", key, inputStream, contentLength);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return "업로드 완료";
    }

    @PostMapping("/api/s3/multipart-files/future")
    public String uploadMultipleFilesFuture(
            @RequestPart("uploadFiles") List<MultipartFile> multipartFiles) {
        String directoryPath = "haeng-dong/s3-upload-test/"; // 원하는 디렉토리 경로

        // 병렬 업로드를 위한 CompletableFuture 리스트 생성
        List<CompletableFuture<Void>> uploadFutures = multipartFiles.stream().map(file ->
                CompletableFuture.runAsync(() -> {
                    try (InputStream inputStream = file.getInputStream()) {
                        long contentLength = file.getSize(); // 파일 크기 가져오기
                        System.out.println("contentLength = " + contentLength);
                        // S3에 업로드 (key에 디렉토리 경로 포함)
                        String key = directoryPath + file.getOriginalFilename(); // 디렉토리 경로와 파일명 결합
                        s3UploadService.uploadImageToS3("techcourse-project-2024", key, inputStream, contentLength);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                })
        ).collect(Collectors.toList());

        // 모든 업로드가 완료될 때까지 기다림
        CompletableFuture.allOf(uploadFutures.toArray(new CompletableFuture[0])).join();

        return "업로드 완료";
    }

    @PostMapping("/api/s3/multipart-files/async")
    public String uploadMultipleFilesAsync(
            @RequestPart("uploadFiles") List<MultipartFile> multipartFiles) {
        s3UploadService.uploadImageToS3sAsync("techcourse-project-2024", multipartFiles);
        return "업로드 완료";
    }
}
