package server.haengdong.s3.multipart;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FileUploadController {

    private final S3UploadService s3UploadService;

    public FileUploadController(S3UploadService s3UploadService) {
        this.s3UploadService = s3UploadService;
    }

    @PostMapping("/api/multipart-files")
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
}
