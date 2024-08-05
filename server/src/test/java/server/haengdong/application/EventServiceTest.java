package server.haengdong.application;


import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;
import static org.mockito.BDDMockito.given;
import static server.haengdong.domain.action.MemberActionStatus.IN;
import static server.haengdong.domain.action.MemberActionStatus.OUT;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import server.haengdong.application.request.EventAppRequest;
import server.haengdong.application.request.MemberUpdateAppRequest;
import server.haengdong.application.response.ActionAppResponse;
import server.haengdong.application.response.EventAppResponse;
import server.haengdong.application.response.EventDetailAppResponse;
import server.haengdong.application.response.MembersAppResponse;
import server.haengdong.domain.action.Action;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.BillActionRepository;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.domain.event.EventTokenProvider;
import server.haengdong.support.extension.DatabaseCleanerExtension;
import server.haengdong.exception.HaengdongException;
import server.haengdong.support.fixture.Fixture;

@ExtendWith(DatabaseCleanerExtension.class)
@SpringBootTest
class EventServiceTest {

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
        Action action = new Action(event, 1L);
        MemberAction memberAction = new MemberAction(action, "토다리", IN, 1L);
        Action action1 = new Action(event, 2L);
        MemberAction memberAction1 = new MemberAction(action1, "쿠키", IN, 1L);
        Action action2 = new Action(event, 3L);
        BillAction billAction = new BillAction(action2, "뽕나무쟁이족발", 30000L);
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
                        tuple(3L, "뽕나무쟁이족발", 30000L, 3L, "BILL")
                );
    }

    @DisplayName("행사에 참여한 전체 인원을 중복 없이 조회한다.")
    @Test
    void findAllMembersTest() {
        Event event = Fixture.EVENT1;
        Action action1 = new Action(event, 1L);
        Action action2 = new Action(event, 2L);
        Action action3 = new Action(event, 3L);
        Action action4 = new Action(event, 4L);
        BillAction billAction = new BillAction(action3, "뽕나무쟁이족발", 30000L);
        MemberAction memberAction1 = new MemberAction(action1, "토다리", IN, 1L);
        MemberAction memberAction2 = new MemberAction(action2, "쿠키", IN, 1L);
        MemberAction memberAction3 = new MemberAction(action4, "쿠키", OUT, 1L);
        eventRepository.save(event);
        billActionRepository.save(billAction);
        memberActionRepository.saveAll(List.of(memberAction1, memberAction2, memberAction3));

        MembersAppResponse membersAppResponse = eventService.findAllMembers(event.getToken());

        assertThat(membersAppResponse.memberNames()).containsExactlyInAnyOrder("토다리", "쿠키");
    }

    @DisplayName("행사 참여 인원의 이름을 변경한다.")
    @Test
    void updateMember() {
        Event event = Fixture.EVENT1;
        MemberAction memberAction1 = new MemberAction(new Action(event, 1L), "토다리", IN, 1L);
        MemberAction memberAction2 = new MemberAction(new Action(event, 2L), "쿠키", IN, 1L);
        MemberAction memberAction3 = new MemberAction(new Action(event, 3L), "웨디", IN, 2L);
        MemberAction memberAction4 = new MemberAction(new Action(event, 4L), "쿠키", OUT, 3L);
        MemberAction memberAction5 = new MemberAction(new Action(event, 5L), "쿠키", IN, 4L);
        MemberAction memberAction6 = new MemberAction(new Action(event, 6L), "쿠키", OUT, 5L);
        eventRepository.save(event);
        memberActionRepository.saveAll(List.of(
                memberAction1, memberAction2, memberAction3, memberAction4, memberAction5, memberAction6
        ));

        eventService.updateMember(event.getToken(), "쿠키", new MemberUpdateAppRequest("쿡쿡"));

        List<MemberAction> foundMemberActions = memberActionRepository.findAllByEvent(event);
        assertThat(foundMemberActions)
                .extracting(MemberAction::getId, MemberAction::getMemberName)
                .contains(
                        tuple(memberAction1.getId(), "토다리"),
                        tuple(memberAction2.getId(), "쿡쿡"),
                        tuple(memberAction3.getId(), "웨디"),
                        tuple(memberAction4.getId(), "쿡쿡"),
                        tuple(memberAction5.getId(), "쿡쿡"),
                        tuple(memberAction6.getId(), "쿡쿡")
                );
    }

    @DisplayName("참여 인원 이름을 이미 존재하는 행사 참여 인원과 동일한 이름으로 변경할 수 없다.")
    @Test
    void updateMember1() {
        Event event = Fixture.EVENT1;
        MemberAction memberAction1 = new MemberAction(new Action(event, 1L), "토다리", IN, 1L);
        MemberAction memberAction2 = new MemberAction(new Action(event, 2L), "쿠키", IN, 1L);
        MemberAction memberAction3 = new MemberAction(new Action(event, 3L), "웨디", IN, 2L);
        eventRepository.save(event);
        memberActionRepository.saveAll(List.of(memberAction1, memberAction2, memberAction3));

        assertThatThrownBy(() -> eventService.updateMember(event.getToken(), "쿠키", new MemberUpdateAppRequest("토다리")))
                .isInstanceOf(HaengdongException.class);
    }
}
