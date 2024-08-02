package server.haengdong.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;
import static server.haengdong.domain.action.MemberActionStatus.IN;
import static server.haengdong.domain.action.MemberActionStatus.OUT;

import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import server.haengdong.application.request.MemberActionSaveAppRequest;
import server.haengdong.application.request.MemberActionsSaveAppRequest;
import server.haengdong.domain.action.Action;
import server.haengdong.domain.action.ActionRepository;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionRepository;
import server.haengdong.domain.action.MemberActionStatus;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.exception.HaengdongException;

@SpringBootTest
class MemberActionServiceTest {

    @Autowired
    private MemberActionService memberActionService;

    @Autowired
    private MemberActionRepository memberActionRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ActionRepository actionRepository;

    @AfterEach
    void tearDown() {
        memberActionRepository.deleteAllInBatch();
        actionRepository.deleteAllInBatch();
        eventRepository.deleteAllInBatch();
    }

    @DisplayName("현재 행사에 참여하고 있는 경우에 나갈 수 있다.")
    @Test
    void saveMemberActionTest() {
        Event event = eventRepository.save(new Event("test", "TOKEN"));
        Action action = new Action(event, 1L);
        MemberAction memberAction = createMemberAction(action, "망쵸", IN, 1L);
        memberActionRepository.save(memberAction);

        assertThatCode(() -> memberActionService.saveMemberAction("TOKEN", new MemberActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("망쵸", "OUT")))))
                .doesNotThrowAnyException();
    }

    @DisplayName("행사에서 퇴장한 경우에 입장할 수 있다.")
    @Test
    void saveMemberActionTest1() {
        Event event = eventRepository.save(new Event("test", "TOKEN"));
        Action actionOne = new Action(event, 1L);
        MemberAction memberActionOne = createMemberAction(actionOne, "망쵸", IN, 1L);
        memberActionRepository.save(memberActionOne);

        Action actionTwo = new Action(event, 2L);
        MemberAction memberActionTwo = createMemberAction(actionTwo, "망쵸", OUT, 1L);
        memberActionRepository.save(memberActionTwo);

        assertThatCode(() -> memberActionService.saveMemberAction("TOKEN", new MemberActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("망쵸", "IN")))))
                .doesNotThrowAnyException();
    }

    @DisplayName("행사에 입장하지 않았을 경우 퇴장할 수 없다.")
    @Test
    void saveMemberActionTest2() {
        MemberActionsSaveAppRequest appRequest = new MemberActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("TOKEN", "OUT")));

        assertThatCode(() -> memberActionService.saveMemberAction("TOKEN", appRequest))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("이벤트가 없으면 현재 참여 인원을 조회할 수 없다.")
    @Test
    void getCurrentMembers() {
        assertThatThrownBy(() -> memberActionService.getCurrentMembers("token"))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("이벤트에 속한 멤버 액션을 삭제하면 이후에 기록된 해당 참여자의 모든 멤버 액션을 삭제한다.")
    @Test
    void deleteMemberAction() {
        String token = "TOKEN";
        Event event = new Event("행동대장 회식", token);
        eventRepository.save(event);
        Action action = Action.createFirst(event);
        MemberAction memberAction1 = createMemberAction(action, "토다리", IN, 1L);
        Action targetAction = action.next();
        MemberAction memberAction2 = createMemberAction(targetAction, "토다리", OUT, 2L);
        MemberAction memberAction3 = createMemberAction(action.next(), "쿠키", IN, 3L);
        MemberAction memberAction4 = createMemberAction(action.next(), "웨디", IN, 4L);
        MemberAction memberAction5 = createMemberAction(action.next(), "토다리", IN, 5L);
        MemberAction memberAction6 = createMemberAction(action.next(), "토다리", OUT, 6L);
        MemberAction memberAction7 = createMemberAction(action.next(), "쿠키", OUT, 7L);
        memberActionRepository.saveAll(
                List.of(memberAction1,
                        memberAction2,
                        memberAction3,
                        memberAction4,
                        memberAction5,
                        memberAction6,
                        memberAction7)
        );

        memberActionService.deleteMemberAction(token, targetAction.getId());
        List<MemberAction> memberActions = memberActionRepository.findAll();

        assertThat(memberActions).hasSize(4)
                .extracting("id", "memberName", "status")
                .containsExactly(
                        tuple(memberAction1.getId(), "토다리", IN),
                        tuple(memberAction3.getId(), "쿠키", IN),
                        tuple(memberAction4.getId(), "웨디", IN),
                        tuple(memberAction7.getId(), "쿠키", OUT)
                );
    }

    private static MemberAction createMemberAction(Action action,
                                                   String memberName,
                                                   MemberActionStatus memberActionStatus,
                                                   long memberGroupId) {
        return new MemberAction(action, memberName, memberActionStatus, memberGroupId);
    }
}
