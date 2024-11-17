package haengdong.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import haengdong.event.application.EventImageFacadeService;
import haengdong.event.application.EventService;
import haengdong.event.application.ImageService;
import haengdong.event.application.response.EventImageSaveAppResponse;
import haengdong.event.application.response.ImageInfo;
import haengdong.event.domain.event.Event;
import haengdong.event.domain.event.image.EventImageRepository;
import haengdong.event.domain.event.EventRepository;
import haengdong.common.exception.HaengdongException;
import haengdong.support.fixture.Fixture;


class EventImageFacadeServiceTest extends ServiceTestSupport {

    @Autowired
    private EventImageFacadeService eventImageFacadeService;

    @MockBean
    private ImageService imageService;

    @SpyBean
    private EventService eventService;

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

    @DisplayName("S3와 데이터베이스 간의 불일치 데이터를 올바르게 처리한다.")
    @Test
    void removeUnmatchedImageTest() {
        Instant fixedNow = Instant.parse("2023-10-08T00:00:00Z");
        Instant endDate = fixedNow.minus(1, ChronoUnit.DAYS);
        List<EventImageSaveAppResponse> savedEventImages = List.of(
                new EventImageSaveAppResponse(1L, "image1.jpg"),
                new EventImageSaveAppResponse(2L, "image2.jpg"),
                new EventImageSaveAppResponse(3L, "image3.jpg"),
                new EventImageSaveAppResponse(4L, "image4.jpg")
        );
        List<ImageInfo> foundImages = List.of(
                new ImageInfo("image3.jpg", fixedNow.minus(4, ChronoUnit.DAYS)),
                new ImageInfo("image4.jpg", fixedNow.minus(5, ChronoUnit.DAYS)),
                new ImageInfo("image5.jpg", fixedNow.minus(6, ChronoUnit.DAYS)),
                new ImageInfo("image6.jpg", fixedNow.minus(7, ChronoUnit.DAYS))
        );
        when(eventService.findImagesDateBefore(any())).thenReturn(savedEventImages);
        when(imageService.findImages()).thenReturn(foundImages);

        eventImageFacadeService.removeUnmatchedImage();

        verify(eventService).deleteImage(eq(1L));
        verify(eventService).deleteImage(eq(2L));
        verify(imageService).deleteImage(eq("image5.jpg"));
        verify(imageService).deleteImage(eq("image6.jpg"));
        verify(eventService, times(0)).deleteImage(eq(3L));
        verify(eventService, times(0)).deleteImage(eq(4L));
        verify(imageService, times(0)).deleteImage(eq("image3.jpg"));
        verify(imageService, times(0)).deleteImage(eq("image4.jpg"));
    }
}
