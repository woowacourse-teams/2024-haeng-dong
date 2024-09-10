package server.haengdong.application;


import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;
import static org.mockito.BDDMockito.given;
import static server.haengdong.domain.action.MemberActionStatus.IN;
import static server.haengdong.domain.action.MemberActionStatus.OUT;
import static server.haengdong.support.fixture.Fixture.BILL_ACTION;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import server.haengdong.application.request.EventAppRequest;
import server.haengdong.application.request.MemberNameUpdateAppRequest;
import server.haengdong.application.request.MemberNamesUpdateAppRequest;
import server.haengdong.application.response.ActionAppResponse;
import server.haengdong.application.response.EventAppResponse;
import server.haengdong.application.response.EventDetailAppResponse;
import server.haengdong.application.response.MemberBillReportAppResponse;
import server.haengdong.application.response.MembersAppResponse;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.BillActionDetail;
import server.haengdong.domain.action.BillActionRepository;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionRepository;
import server.haengdong.domain.action.Sequence;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.domain.event.EventTokenProvider;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;
import server.haengdong.support.fixture.Fixture;

class EventServiceTest extends ServiceTestSupport {

    @Autowired
    private EventService eventService;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private BillActionRepository billActionRepository;

    @Autowired
    private MemberActionRepository memberActionRepository;

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

    @DisplayName("행사에 속한 모든 액션을 조회한다.")
    @Test
    void findActionsTest() {
        Event event = Fixture.EVENT1;
        MemberAction memberAction = Fixture.createMemberAction(event, 1L, "토다리", IN);
        MemberAction memberAction1 = Fixture.createMemberAction(event, 2L, "쿠키", IN);
        BillAction billAction = Fixture.createBillAction(event, 3L, "뽕나무쟁이족발", 30000L);
        eventRepository.save(event);
        memberActionRepository.saveAll(List.of(memberAction, memberAction1));
        billActionRepository.save(billAction);

        List<ActionAppResponse> actionAppResponses = eventService.findActions(event.getToken());

        assertThat(actionAppResponses).hasSize(3)
                .extracting(ActionAppResponse::actionId,
                        ActionAppResponse::name,
                        ActionAppResponse::price,
                        ActionAppResponse::sequence,
                        ActionAppResponse::actionTypeName)
                .containsExactly(
                        tuple(1L, "토다리", null, 1L, "IN"),
                        tuple(2L, "쿠키", null, 2L, "IN"),
                        tuple(1L, "뽕나무쟁이족발", 30000L, 3L, "BILL")
                );
    }

    @DisplayName("행사에 참여한 전체 인원을 중복 없이 조회한다.")
    @Test
    void findAllMembersTest() {
        Event event = Fixture.EVENT1;
        BillAction billAction = Fixture.createBillAction(event, 3L, "뽕나무쟁이족발", 30000L);
        MemberAction memberAction1 = Fixture.createMemberAction(event, 1L, "토다리", IN);
        MemberAction memberAction2 = Fixture.createMemberAction(event, 2L, "쿠키", IN);
        MemberAction memberAction3 = Fixture.createMemberAction(event, 4L, "쿠키", OUT);
        eventRepository.save(event);
        billActionRepository.save(billAction);
        memberActionRepository.saveAll(List.of(memberAction1, memberAction2, memberAction3));

        MembersAppResponse membersAppResponse = eventService.findAllMembers(event.getToken());

        assertThat(membersAppResponse.memberNames()).containsExactlyInAnyOrder("토다리", "쿠키");
    }

    @DisplayName("행사 참여 인원들의 이름을 변경한다.")
    @Test
    void updateMember() {
        Event event = Fixture.EVENT1;
        MemberAction memberAction1 = Fixture.createMemberAction(event, 1L, "토다리", IN);
        MemberAction memberAction2 = Fixture.createMemberAction(event, 2L, "쿠키", IN);
        MemberAction memberAction3 = Fixture.createMemberAction(event, 3L, "웨디", IN);
        MemberAction memberAction4 = Fixture.createMemberAction(event, 4L, "쿠키", OUT);
        MemberAction memberAction5 = Fixture.createMemberAction(event, 5L, "쿠키", IN);
        MemberAction memberAction6 = Fixture.createMemberAction(event, 6L, "쿠키", OUT);
        eventRepository.save(event);
        memberActionRepository.saveAll(List.of(
                memberAction1, memberAction2, memberAction3, memberAction4, memberAction5, memberAction6
        ));

        eventService.updateMember(event.getToken(), new MemberNamesUpdateAppRequest(List.of(
                new MemberNameUpdateAppRequest("쿠키", "쿡쿡"),
                new MemberNameUpdateAppRequest("토다리", "토쟁이")
        )));

        List<MemberAction> foundMemberActions = memberActionRepository.findAllByMember_Event(event);
        assertThat(foundMemberActions)
                .extracting(MemberAction::getId, MemberAction::getMemberName)
                .contains(
                        tuple(memberAction1.getId(), "토쟁이"),
                        tuple(memberAction2.getId(), "쿡쿡"),
                        tuple(memberAction3.getId(), "웨디"),
                        tuple(memberAction4.getId(), "쿡쿡"),
                        tuple(memberAction5.getId(), "쿡쿡"),
                        tuple(memberAction6.getId(), "쿡쿡")
                );
    }

    @DisplayName("이미 존재하는 인원의 이름으로 변경할 수 없다.")
    @Test
    void updateMember1() {
        Event event = Fixture.EVENT1;
        MemberAction memberAction1 = Fixture.createMemberAction(event, 1L, "토다리", IN);
        MemberAction memberAction2 = Fixture.createMemberAction(event, 2L, "쿠키", IN);
        MemberAction memberAction3 = Fixture.createMemberAction(event, 3L, "웨디", IN);
        eventRepository.save(event);
        memberActionRepository.saveAll(List.of(memberAction1, memberAction2, memberAction3));

        MemberNamesUpdateAppRequest appRequest = new MemberNamesUpdateAppRequest(List.of(
                new MemberNameUpdateAppRequest("쿠키", "쿡쿡"),
                new MemberNameUpdateAppRequest("웨디", "토다리")
        ));

        assertThatThrownBy(() -> eventService.updateMember(event.getToken(), appRequest))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("존재하지 않는 인원은 변경할 수 없다.")
    @Test
    void updateMember2() {
        Event event = Fixture.EVENT1;
        MemberAction memberAction1 = Fixture.createMemberAction(event, 1L, "토다리", IN);
        MemberAction memberAction2 = Fixture.createMemberAction(event, 2L, "쿠키", IN);
        MemberAction memberAction3 = Fixture.createMemberAction(event, 3L, "웨디", IN);
        eventRepository.save(event);
        memberActionRepository.saveAll(List.of(memberAction1, memberAction2, memberAction3));

        MemberNamesUpdateAppRequest appRequest = new MemberNamesUpdateAppRequest(List.of(
                new MemberNameUpdateAppRequest("쿡쿡", "토쟁이"),
                new MemberNameUpdateAppRequest("웨디", "말복")
        ));

        assertThatThrownBy(() -> eventService.updateMember(event.getToken(), appRequest))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("변경 전 참여 인원 이름이 중복될 수 없다.")
    @Test
    void updateMember3() {
        Event event = Fixture.EVENT1;
        MemberAction memberAction1 = Fixture.createMemberAction(event, 1L, "토다리", IN);
        MemberAction memberAction2 = Fixture.createMemberAction(event, 2L, "쿠키", IN);
        MemberAction memberAction3 = Fixture.createMemberAction(event, 3L, "웨디", IN);
        eventRepository.save(event);
        memberActionRepository.saveAll(List.of(memberAction1, memberAction2, memberAction3));

        MemberNamesUpdateAppRequest appRequest = new MemberNamesUpdateAppRequest(List.of(
                new MemberNameUpdateAppRequest("쿠키", "쿡쿡"),
                new MemberNameUpdateAppRequest("쿠키", "토쟁이")
        ));

        assertThatThrownBy(() -> eventService.updateMember(event.getToken(), appRequest))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("변경 후 참여 인원 이름이 중복될 수 없다.")
    @Test
    void updateMember4() {
        Event event = Fixture.EVENT1;
        MemberAction memberAction1 = Fixture.createMemberAction(event, 1L, "토다리", IN);
        MemberAction memberAction2 = Fixture.createMemberAction(event, 2L, "쿠키", IN);
        MemberAction memberAction3 = Fixture.createMemberAction(event, 3L, "웨디", IN);
        eventRepository.save(event);
        memberActionRepository.saveAll(List.of(memberAction1, memberAction2, memberAction3));

        MemberNamesUpdateAppRequest appRequest = new MemberNamesUpdateAppRequest(List.of(
                new MemberNameUpdateAppRequest("쿠키", "쿡쿡"),
                new MemberNameUpdateAppRequest("토다리", "쿡쿡")
        ));

        assertThatThrownBy(() -> eventService.updateMember(event.getToken(), appRequest))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("참여자별 정산 현황을 조회한다.")
    @Test
    void getMemberBillReports() {
        Event event = Fixture.EVENT1;
        Event savedEvent = eventRepository.save(event);
        List<MemberAction> memberActions = List.of(
                new MemberAction(savedEvent, new Sequence(1L), "소하", IN),
                new MemberAction(savedEvent, new Sequence(2L), "감자", IN),
                new MemberAction(savedEvent, new Sequence(3L), "쿠키", IN),
                new MemberAction(savedEvent, new Sequence(5L), "감자", OUT)
        );
        List<BillAction> billActions = List.of(
                new BillAction(savedEvent, new Sequence(4L), "뽕족", 60_000L),
                new BillAction(savedEvent, new Sequence(7L), "인생네컷", 20_000L)
        );
        billActions.get(0).addDetails(
                List.of(
                        new BillActionDetail(BILL_ACTION, "소하", 10_000L, false),
                        new BillActionDetail(BILL_ACTION, "감자", 40_000L, true),
                        new BillActionDetail(BILL_ACTION, "쿠키", 10_000L, false)
                )
        );
        billActions.get(1).addDetails(
                List.of(
                        new BillActionDetail(BILL_ACTION, "소하", 5_000L, true),
                        new BillActionDetail(BILL_ACTION, "쿠키", 15_000L, true)
                )
        );
        memberActionRepository.saveAll(memberActions);
        billActionRepository.saveAll(billActions);

        List<MemberBillReportAppResponse> responses = eventService.getMemberBillReports(event.getToken());

        assertThat(responses)
                .hasSize(3)
                .extracting(MemberBillReportAppResponse::name, MemberBillReportAppResponse::price)
                .containsExactlyInAnyOrder(
                        tuple("감자", 40_000L),
                        tuple("쿠키", 25_000L),
                        tuple("소하", 15_000L)
                );
    }

    @DisplayName("존재하지 않는 이벤트의 참여자별 정산 현황을 조회하는 경우 예외가 발생한다.")
    @Test
    void getMemberBillReports1() {
        assertThatThrownBy(() -> eventService.getMemberBillReports("invalid token"))
                .isInstanceOf(HaengdongException.class)
                .hasMessage(HaengdongErrorCode.EVENT_NOT_FOUND.getMessage());
    }
}
