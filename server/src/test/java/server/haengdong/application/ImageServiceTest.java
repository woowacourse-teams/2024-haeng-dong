package server.haengdong.application;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.awaitility.Awaitility.given;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;

import java.util.List;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import server.haengdong.exception.HaengdongException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;


class ImageServiceTest extends ServiceTestSupport {

    @Autowired
    private ImageService imageService;

    @MockBean
    private S3Client s3Client;

    @DisplayName("이미지 업로드 도중 실패하면 예외가 커스텀 예외가 발생한다.")
    @Test
    void uploadImages() {
        MultipartFile multipartFile1 = new MockMultipartFile("file1", "test1.txt", "text/plain", "hello1".getBytes());
        MultipartFile multipartFile2 = new MockMultipartFile("file2", "test2.txt", "text/plain", "hello2".getBytes());
        MultipartFile multipartFile3 = new MockMultipartFile("file3", "test3.txt", "text/plain", "hello3".getBytes());
        MultipartFile multipartFile4 = new MockMultipartFile("file4", "test4.txt", "text/plain", "hello4".getBytes());
        MultipartFile multipartFile5 = new MockMultipartFile("file5", "test5.txt", "text/plain", "hello5".getBytes());

        doThrow(new RuntimeException("S3 upload failed"))
                .when(s3Client).putObject(any(PutObjectRequest.class), any(RequestBody.class));

        assertThatThrownBy(() -> imageService.uploadImages(List.of(multipartFile1, multipartFile2, multipartFile3, multipartFile4, multipartFile5)))
                .isInstanceOf(HaengdongException.class);
    }
}
