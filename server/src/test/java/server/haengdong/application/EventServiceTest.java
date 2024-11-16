package server.haengdong.application;


import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.tuple;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.BDDMockito.given;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.mock.mockito.MockBean;
import server.haengdong.application.request.EventGuestAppRequest;
import server.haengdong.application.request.EventUpdateAppRequest;
import server.haengdong.application.response.EventAppResponse;
import server.haengdong.application.response.EventDetailAppResponse;
import server.haengdong.application.response.EventImageAppResponse;
import server.haengdong.application.response.MemberBillReportAppResponse;
import server.haengdong.domain.RandomValueProvider;
import server.haengdong.domain.bill.Bill;
import server.haengdong.domain.bill.BillRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventImage;
import server.haengdong.domain.event.EventImageRepository;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.domain.eventmember.EventMember;
import server.haengdong.domain.eventmember.EventMemberRepository;
import server.haengdong.exception.HaengdongException;
import server.haengdong.support.fixture.Fixture;

class EventServiceTest extends ServiceTestSupport {

    @Autowired
    private EventService eventService;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private EventMemberRepository eventMemberRepository;

    @Autowired
    private EventImageRepository eventImageRepository;

    @MockBean
    private RandomValueProvider randomValueProvider;

    @Value("${image.base-url}")
    private String baseUrl;

    @DisplayName("행사를 생성한다")
    @Test
    void saveEventGuestTest() {
        EventGuestAppRequest request = new EventGuestAppRequest("test", "nickname", "1234");
        given(randomValueProvider.createRandomValue()).willReturn("TOKEN");

        EventAppResponse response = eventService.saveEventGuest(request);

        assertThat(response.token()).isEqualTo("TOKEN");
    }

    @DisplayName("토큰으로 행사를 조회한다.")
    @Test
    void findEventTest() {
        Event event = Fixture.EVENT1;
        eventRepository.save(event);

        EventDetailAppResponse eventDetailAppResponse = eventService.findEvent(event.getToken());

        assertThat(eventDetailAppResponse.eventName()).isEqualTo(event.getName());
    }

    @DisplayName("행사 정보를 수정한다.")
    @Test
    void updateEventTest() {
        Event event = new Event("행동대장 비대위", "1234", "token");
        eventRepository.save(event);

        EventUpdateAppRequest eventUpdateAppRequest = new EventUpdateAppRequest("새로운 행사 이름", "토스뱅크", "12345678");
        eventService.updateEvent(event.getToken(), eventUpdateAppRequest);

        Event updateEvent = eventRepository.findByToken(event.getToken()).get();
        assertAll(
                () -> assertThat(updateEvent.getName()).isEqualTo("새로운 행사 이름"),
                () -> assertThat(updateEvent.getBankName()).isEqualTo("토스뱅크"),
                () -> assertThat(updateEvent.getAccountNumber()).isEqualTo("12345678")
        );
    }

    @DisplayName("행사의 은행 정보만 수정한다.")
    @Test
    void updateEventTest1() {
        Event event = new Event("행동대장 비대위", "1234", "token");
        eventRepository.save(event);

        EventUpdateAppRequest eventUpdateAppRequest = new EventUpdateAppRequest(null, "토스뱅크", "12345678");
        eventService.updateEvent(event.getToken(), eventUpdateAppRequest);

        Event updateEvent = eventRepository.findByToken(event.getToken()).get();
        assertAll(
                () -> assertThat(updateEvent.getName()).isEqualTo("행동대장 비대위"),
                () -> assertThat(updateEvent.getBankName()).isEqualTo("토스뱅크"),
                () -> assertThat(updateEvent.getAccountNumber()).isEqualTo("12345678")
        );
    }

    @DisplayName("행사의 이름만 수정한다.")
    @Test
    void updateEventTest2() {
        Event event = new Event("행동대장 비대위", "1234", "token");
        eventRepository.save(event);

        EventUpdateAppRequest eventUpdateAppRequest = new EventUpdateAppRequest("행동대장 정상 영업", null, null);
        eventService.updateEvent(event.getToken(), eventUpdateAppRequest);

        Event updateEvent = eventRepository.findByToken(event.getToken()).get();
        assertAll(
                () -> assertThat(updateEvent.getName()).isEqualTo("행동대장 정상 영업"),
                () -> assertThat(updateEvent.getBankName()).isEqualTo(""),
                () -> assertThat(updateEvent.getAccountNumber()).isEqualTo("")
        );
    }

    @DisplayName("행사의 계좌 정보 일부가 누락되면 변경하지 않는다.")
    @Test
    void updateEventTest3() {
        Event event = new Event("행동대장 비대위", "1234", "token");
        eventRepository.save(event);

        EventUpdateAppRequest eventUpdateAppRequest = new EventUpdateAppRequest(null, "망쵸뱅크", null);
        eventService.updateEvent(event.getToken(), eventUpdateAppRequest);

        Event updateEvent = eventRepository.findByToken(event.getToken()).get();
        assertAll(
                () -> assertThat(updateEvent.getName()).isEqualTo("행동대장 비대위"),
                () -> assertThat(updateEvent.getBankName()).isEqualTo(""),
                () -> assertThat(updateEvent.getAccountNumber()).isEqualTo("")
        );
    }

    @DisplayName("참여자별 정산 현황을 조회한다.")
    @Test
    void getMemberBillReports() {
        Event event = Fixture.EVENT1;
        Event savedEvent = eventRepository.save(event);
        List<EventMember> eventMembers = List.of(
                new EventMember(savedEvent, "소하"),
                new EventMember(savedEvent, "감자"),
                new EventMember(savedEvent, "쿠키"),
                new EventMember(savedEvent, "고구마")
        );
        eventMemberRepository.saveAll(eventMembers);
        List<Bill> bills = List.of(
                Bill.create(savedEvent, "뽕족", 60_000L, eventMembers),
                Bill.create(savedEvent, "인생네컷", 20_000L, eventMembers)
        );
        billRepository.saveAll(bills);

        List<MemberBillReportAppResponse> responses = eventService.getMemberBillReports(event.getToken());

        assertThat(responses)
                .hasSize(4)
                .extracting(MemberBillReportAppResponse::name, MemberBillReportAppResponse::price)
                .containsExactlyInAnyOrder(
                        tuple("감자", 20_000L),
                        tuple("쿠키", 20_000L),
                        tuple("소하", 20_000L),
                        tuple("고구마", 20_000L)
                );
    }

    @DisplayName("행사 이미지를 조회한다.")
    @Test
    void findAllImages() {
        Event event = Fixture.EVENT1;
        List<EventImage> eventImages = List.of(
                new EventImage(event, "image1.jpg"),
                new EventImage(event, "image2.jpg")
        );
        eventRepository.save(event);
        eventImageRepository.saveAll(eventImages);

        List<EventImageAppResponse> responses = eventService.findImages(event.getToken());

        assertThat(responses)
                .hasSize(2)
                .extracting(EventImageAppResponse::url)
                .containsExactlyInAnyOrder(
                        baseUrl + "image1.jpg",
                        baseUrl + "image2.jpg"
                );
    }

    @DisplayName("행사 이미지를 저장한다.")
    @Test
    void saveImages() {
        Event event = Fixture.EVENT1;
        eventRepository.save(event);
        List<String> imageNames = List.of("image1.jpg", "image2.jpg");
        given(randomValueProvider.createRandomValue()).willReturn("1234");

        eventService.saveImages(event.getToken(), imageNames);

        List<EventImage> savedEventImages = eventImageRepository.findAllByEvent(event);
        assertThat(savedEventImages)
                .hasSize(2)
                .extracting(EventImage::getName)
                .containsExactlyInAnyOrder(
                        "1234image1.jpg",
                        "1234image2.jpg"
                );
    }

    @DisplayName("행사 이미지를 삭제한다.")
    @Test
    void deleteImage() {
        Event event = Fixture.EVENT1;
        eventRepository.save(event);
        EventImage eventImage = new EventImage(event, "image1.jpg");
        eventImageRepository.save(eventImage);

        eventService.deleteImage(event.getToken(), eventImage.getId());

        assertThat(eventImageRepository.findById(eventImage.getId()))
                .isEmpty();
    }

    @DisplayName("행사 1개당 이미지는 10개까지 업로드 가능하다.")
    @Test
    void validateImageCount() {
        Event event = Fixture.EVENT1;
        eventRepository.save(event);
        List<String> imageNames = List.of("image1.jpg", "image2.jpg");
        String token = event.getToken();
        eventService.saveImages(token, imageNames);

        assertThatThrownBy(
                () -> eventService.saveImages(token, List.of("1", "2", "3", "4", "5", "6", "7", "8", "9")))
                .isInstanceOf(HaengdongException.class);
    }
}
