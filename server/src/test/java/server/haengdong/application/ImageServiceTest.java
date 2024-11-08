package server.haengdong.application;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

class ImageServiceTest extends ServiceTestSupport {

    @Autowired
    private ImageService imageService;

    @MockBean
    private S3Client s3Client;

    @DisplayName("이미지 업로드 실패시 3번 재시도한다.")
    @Test
    void uploadRetry() {
        MultipartFile multipartFile = new MockMultipartFile("file1", "test1.txt", "text/plain", "hello1".getBytes());
        doThrow(new RuntimeException("S3 upload failed"))
                .when(s3Client).putObject(any(PutObjectRequest.class), any(RequestBody.class));

        assertThatThrownBy(() -> imageService.uploadImage(multipartFile, "1234file1"))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("S3 upload failed");
        verify(s3Client, times(3)).putObject(any(PutObjectRequest.class), any(RequestBody.class));
    }

    @DisplayName("이미지 삭제 실패시 3번 재시도한다.")
    @Test
    void deleteRetry() {
        doThrow(new RuntimeException("S3 delete failed"))
                .when(s3Client).deleteObject(any(DeleteObjectRequest.class));

        CompletableFuture<Void> future = imageService.deleteImage("1234file1");

        assertThatThrownBy(future::join)
                .isInstanceOf(CompletionException.class)
                .hasCauseInstanceOf(RuntimeException.class)
                .hasMessageContaining("S3 delete failed");
        verify(s3Client, times(3)).deleteObject(any(DeleteObjectRequest.class));
    }
}
