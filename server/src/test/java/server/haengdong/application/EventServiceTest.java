package server.haengdong.application;


import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.tuple;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.BDDMockito.given;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import server.haengdong.application.request.EventAppRequest;
import server.haengdong.application.request.EventUpdateAppRequest;
import server.haengdong.application.response.EventAppResponse;
import server.haengdong.application.response.EventDetailAppResponse;
import server.haengdong.application.response.MemberBillReportAppResponse;
import server.haengdong.domain.bill.Bill;
import server.haengdong.domain.bill.BillRepository;
import server.haengdong.domain.member.Member;
import server.haengdong.domain.member.MemberRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.domain.event.EventTokenProvider;
import server.haengdong.support.fixture.Fixture;

class EventServiceTest extends ServiceTestSupport {

    @Autowired
    private EventService eventService;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private MemberRepository memberRepository;

    @MockBean
    private EventTokenProvider eventTokenProvider;

    @DisplayName("행사를 생성한다")
    @Test
    void saveEventTest() {
        EventAppRequest request = new EventAppRequest("test", "1234");
        given(eventTokenProvider.createToken()).willReturn("TOKEN");

        EventAppResponse response = eventService.saveEvent(request);

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
        List<Member> members = List.of(
                new Member(savedEvent, "소하"),
                new Member(savedEvent, "감자"),
                new Member(savedEvent, "쿠키"),
                new Member(savedEvent, "고구마")
        );
        memberRepository.saveAll(members);
        List<Bill> bills = List.of(
                Bill.create(savedEvent, "뽕족", 60_000L, members),
                Bill.create(savedEvent, "인생네컷", 20_000L, members)
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
}
