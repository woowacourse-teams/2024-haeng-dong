package server.haengdong.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventImageRepository;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.exception.HaengdongException;
import server.haengdong.support.fixture.Fixture;


class EventImageFacadeServiceTest extends ServiceTestSupport {

    @Autowired
    private EventImageFacadeService eventImageFacadeService;

    @MockBean
    private ImageService imageService;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventImageRepository eventImageRepository;

    @DisplayName("이미지 업로드 도중 실패하면 예외가 커스텀 예외가 발생한다.")
    @Test
    void uploadImages() {
        Event event = Fixture.EVENT1;
        eventRepository.save(event);
        MultipartFile multipartFile1 = new MockMultipartFile("file1", "test1.txt", "text/plain", "hello1".getBytes());
        MultipartFile multipartFile2 = new MockMultipartFile("file2", "test2.txt", "text/plain", "hello2".getBytes());
        MultipartFile multipartFile3 = new MockMultipartFile("file3", "test3.txt", "text/plain", "hello3".getBytes());
        MultipartFile multipartFile4 = new MockMultipartFile("file4", "test4.txt", "text/plain", "hello4".getBytes());
        MultipartFile multipartFile5 = new MockMultipartFile("file5", "test5.txt", "text/plain", "hello5".getBytes());

        doThrow(new RuntimeException("S3 upload failed"))
                .when(imageService).uploadImage(any(MultipartFile.class), any(String.class));

        assertThatThrownBy(() -> eventImageFacadeService.uploadImages(event.getToken(),
                List.of(multipartFile1, multipartFile2, multipartFile3, multipartFile4, multipartFile5)
        ))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("이미지 업로드에 실패했습니다.");
    }

    @DisplayName("이미지 업로드가 1개라도 실패시 데이터베이스에 저장되지 않고 성공한 이미지는 삭제된다..")
    @Test
    void uploadFail1() {
        Event event = Fixture.EVENT1;
        eventRepository.save(event);
        MultipartFile multipartFile1 = new MockMultipartFile("file1", "test1.txt", "text/plain", "hello1".getBytes());
        MultipartFile multipartFile2 = new MockMultipartFile("file2", "test2.txt", "text/plain", "hello2".getBytes());
        MultipartFile multipartFile3 = new MockMultipartFile("file3", "test3.txt", "text/plain", "hello3".getBytes());
        MultipartFile multipartFile4 = new MockMultipartFile("file4", "test4.txt", "text/plain", "hello4".getBytes());
        MultipartFile multipartFile5 = new MockMultipartFile("file5", "test5.txt", "text/plain", "hello5".getBytes());

        doThrow(new RuntimeException("S3 upload failed"))
                .when(imageService).uploadImage(eq(multipartFile5), any(String.class));

        assertThatThrownBy(() -> eventImageFacadeService.uploadImages(event.getToken(),
                List.of(multipartFile1, multipartFile2, multipartFile3, multipartFile4, multipartFile5)
        ))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("이미지 업로드에 실패했습니다.");
        assertThat(eventImageRepository.findAllByEvent(event)).isEmpty();
        verify(imageService, times(4)).deleteImage(any());
    }

    @DisplayName("이미지 업로드가 성공 후 데이터베이스에 저장된다.")
    @Test
    void uploadSuccess() {
        Event event = Fixture.EVENT1;
        eventRepository.save(event);
        MultipartFile multipartFile1 = new MockMultipartFile("file1", "test1.txt", "text/plain", "hello1".getBytes());
        MultipartFile multipartFile2 = new MockMultipartFile("file2", "test2.txt", "text/plain", "hello2".getBytes());
        MultipartFile multipartFile3 = new MockMultipartFile("file3", "test3.txt", "text/plain", "hello3".getBytes());
        MultipartFile multipartFile4 = new MockMultipartFile("file4", "test4.txt", "text/plain", "hello4".getBytes());
        MultipartFile multipartFile5 = new MockMultipartFile("file5", "test5.txt", "text/plain", "hello5".getBytes());

        eventImageFacadeService.uploadImages(event.getToken(),
                        List.of(multipartFile1, multipartFile2, multipartFile3, multipartFile4, multipartFile5));

        assertThat(eventImageRepository.findAllByEvent(event)).hasSize(5);
        verify(imageService, times(5)).uploadImage(any(MultipartFile.class), any(String.class));
    }
}
