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
import server.haengdong.domain.action.Bill;
import server.haengdong.domain.action.BillRepository;
import server.haengdong.domain.action.Member;
import server.haengdong.domain.action.MemberRepository;
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
                () -> assertThat(updateEvent.getAccount()).isEqualTo("토스뱅크 12345678")
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
                () -> assertThat(updateEvent.getAccount()).isEqualTo("토스뱅크 12345678")
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
                () -> assertThat(updateEvent.getAccount()).isEqualTo("")
        );
    }

    @DisplayName("행사의 계좌 정보 일부가 누락되면 변경하지 않는다.")
    void updateEventTest3() {
        Event event = new Event("행동대장 비대위", "1234", "token");
        eventRepository.save(event);

        EventUpdateAppRequest eventUpdateAppRequest = new EventUpdateAppRequest(null, "망쵸뱅크", null);
        eventService.updateEvent(event.getToken(), eventUpdateAppRequest);

        Event updateEvent = eventRepository.findByToken(event.getToken()).get();
        assertAll(
                () -> assertThat(updateEvent.getName()).isEqualTo("행동대장 비대위"),
                () -> assertThat(updateEvent.getAccount()).isEqualTo(" ")
        );
    }

//    @DisplayName("행사에 속한 모든 액션을 조회한다.")
//    @Test
//    void findActionsTest() {
//        Event event = Fixture.EVENT1;
//        MemberAction memberAction = Fixture.createMemberAction(event, 1L, "토다리", IN);
//        MemberAction memberAction1 = Fixture.createMemberAction(event, 2L, "쿠키", IN);
//        Bill billAction = Fixture.createBillAction(event, 3L, "뽕나무쟁이족발", 30000L);
//        eventRepository.save(event);
//        memberRepository.saveAll(List.of(memberAction, memberAction1));
//        billRepository.save(billAction);
//
//        List<StepAppResponse> stepAppRespons = eventService.findActions(event.getToken());
//
//        assertThat(stepAppRespons).hasSize(3)
//                .extracting(
//                        StepAppResponse::actionId,
//                        StepAppResponse::name,
//                        StepAppResponse::price,
//                        StepAppResponse::sequence,
//                        StepAppResponse::actionTypeName)
//                .containsExactly(
//                        tuple(1L, "토다리", null, 1L, "IN"),
//                        tuple(2L, "쿠키", null, 2L, "IN"),
//                        tuple(1L, "뽕나무쟁이족발", 30000L, 3L, "BILL")
//                );
//    }
//
//    @DisplayName("행사 참여 인원들의 이름을 변경한다.")
//    @Test
//    void updateMember() {
//        Event event = Fixture.EVENT1;
//        MemberAction memberAction1 = Fixture.createMemberAction(event, 1L, "토다리", IN);
//        MemberAction memberAction2 = Fixture.createMemberAction(event, 2L, "쿠키", IN);
//        MemberAction memberAction3 = Fixture.createMemberAction(event, 3L, "웨디", IN);
//        MemberAction memberAction4 = Fixture.createMemberAction(event, 4L, "쿠키", OUT);
//        MemberAction memberAction5 = Fixture.createMemberAction(event, 5L, "쿠키", IN);
//        MemberAction memberAction6 = Fixture.createMemberAction(event, 6L, "쿠키", OUT);
//        eventRepository.save(event);
//        memberRepository.saveAll(List.of(
//                memberAction1, memberAction2, memberAction3, memberAction4, memberAction5, memberAction6
//        ));
//
//        eventService.updateMember(event.getToken(), new MemberNamesUpdateAppRequest(List.of(
//                new MemberNameUpdateAppRequest("쿠키", "쿡쿡"),
//                new MemberNameUpdateAppRequest("토다리", "토쟁이")
//        )));
//
//        List<MemberAction> foundMemberActions = memberRepository.findAllByMember_Event(event);
//        assertThat(foundMemberActions)
//                .extracting(MemberAction::getId, MemberAction::getMemberName)
//                .contains(
//                        tuple(memberAction1.getId(), "토쟁이"),
//                        tuple(memberAction2.getId(), "쿡쿡"),
//                        tuple(memberAction3.getId(), "웨디"),
//                        tuple(memberAction4.getId(), "쿡쿡"),
//                        tuple(memberAction5.getId(), "쿡쿡"),
//                        tuple(memberAction6.getId(), "쿡쿡")
//                );
//    }
//
//    @DisplayName("이미 존재하는 인원의 이름으로 변경할 수 없다.")
//    @Test
//    void updateMember1() {
//        Event event = Fixture.EVENT1;
//        MemberAction memberAction1 = Fixture.createMemberAction(event, 1L, "토다리", IN);
//        MemberAction memberAction2 = Fixture.createMemberAction(event, 2L, "쿠키", IN);
//        MemberAction memberAction3 = Fixture.createMemberAction(event, 3L, "웨디", IN);
//        eventRepository.save(event);
//        memberRepository.saveAll(List.of(memberAction1, memberAction2, memberAction3));
//
//        MemberNamesUpdateAppRequest appRequest = new MemberNamesUpdateAppRequest(List.of(
//                new MemberNameUpdateAppRequest("쿠키", "쿡쿡"),
//                new MemberNameUpdateAppRequest("웨디", "토다리")
//        ));
//
//        assertThatThrownBy(() -> eventService.updateMember(event.getToken(), appRequest))
//                .isInstanceOf(HaengdongException.class);
//    }
//
//    @DisplayName("존재하지 않는 인원은 변경할 수 없다.")
//    @Test
//    void updateMember2() {
//        Event event = Fixture.EVENT1;
//        MemberAction memberAction1 = Fixture.createMemberAction(event, 1L, "토다리", IN);
//        MemberAction memberAction2 = Fixture.createMemberAction(event, 2L, "쿠키", IN);
//        MemberAction memberAction3 = Fixture.createMemberAction(event, 3L, "웨디", IN);
//        eventRepository.save(event);
//        memberRepository.saveAll(List.of(memberAction1, memberAction2, memberAction3));
//
//        MemberNamesUpdateAppRequest appRequest = new MemberNamesUpdateAppRequest(List.of(
//                new MemberNameUpdateAppRequest("쿡쿡", "토쟁이"),
//                new MemberNameUpdateAppRequest("웨디", "말복")
//        ));
//
//        assertThatThrownBy(() -> eventService.updateMember(event.getToken(), appRequest))
//                .isInstanceOf(HaengdongException.class);
//    }
//
//    @DisplayName("변경 전 참여 인원 이름이 중복될 수 없다.")
//    @Test
//    void updateMember3() {
//        Event event = Fixture.EVENT1;
//        MemberAction memberAction1 = Fixture.createMemberAction(event, 1L, "토다리", IN);
//        MemberAction memberAction2 = Fixture.createMemberAction(event, 2L, "쿠키", IN);
//        MemberAction memberAction3 = Fixture.createMemberAction(event, 3L, "웨디", IN);
//        eventRepository.save(event);
//        memberRepository.saveAll(List.of(memberAction1, memberAction2, memberAction3));
//
//        MemberNamesUpdateAppRequest appRequest = new MemberNamesUpdateAppRequest(List.of(
//                new MemberNameUpdateAppRequest("쿠키", "쿡쿡"),
//                new MemberNameUpdateAppRequest("쿠키", "토쟁이")
//        ));
//
//        assertThatThrownBy(() -> eventService.updateMember(event.getToken(), appRequest))
//                .isInstanceOf(HaengdongException.class);
//    }
//
//    @DisplayName("변경 후 참여 인원 이름이 중복될 수 없다.")
//    @Test
//    void updateMember4() {
//        Event event = Fixture.EVENT1;
//        MemberAction memberAction1 = Fixture.createMemberAction(event, 1L, "토다리", IN);
//        MemberAction memberAction2 = Fixture.createMemberAction(event, 2L, "쿠키", IN);
//        MemberAction memberAction3 = Fixture.createMemberAction(event, 3L, "웨디", IN);
//        eventRepository.save(event);
//        memberRepository.saveAll(List.of(memberAction1, memberAction2, memberAction3));
//
//        MemberNamesUpdateAppRequest appRequest = new MemberNamesUpdateAppRequest(List.of(
//                new MemberNameUpdateAppRequest("쿠키", "쿡쿡"),
//                new MemberNameUpdateAppRequest("토다리", "쿡쿡")
//        ));
//
//        assertThatThrownBy(() -> eventService.updateMember(event.getToken(), appRequest))
//                .isInstanceOf(HaengdongException.class);
//    }

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
//
//    @DisplayName("존재하지 않는 이벤트의 참여자별 정산 현황을 조회하는 경우 예외가 발생한다.")
//    @Test
//    void getMemberBillReports1() {
//        assertThatThrownBy(() -> eventService.getMemberBillReports("invalid token"))
//                .isInstanceOf(HaengdongException.class)
//                .hasMessage(HaengdongErrorCode.EVENT_NOT_FOUND.getMessage());
//    }
}
