package server.haengdong.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import server.haengdong.application.request.MemberActionSaveAppRequest;
import server.haengdong.application.request.MemberActionsSaveAppRequest;
import server.haengdong.domain.action.Action;
import server.haengdong.domain.action.CurrentMembers;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionRepository;
import server.haengdong.domain.action.MemberActionStatus;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.exception.HaengdongException;
import server.haengdong.support.extension.DatabaseCleanerExtension;
import server.haengdong.support.fixture.Fixture;

@ExtendWith(DatabaseCleanerExtension.class)
@SpringBootTest
class MemberActionFactoryTest {

    @Autowired
    private MemberActionFactory memberActionFactory;

    @Autowired
    private MemberActionRepository memberActionRepository;

    @Autowired
    private EventRepository eventRepository;

    @DisplayName("이전 멤버 액션이 시퀀스 기준으로 정렬되지 않은 상태에서 새로운 멤버 액션 요청을 검증한다.")
    @Test
    void createMemberActionsTest() {
        Event event = eventRepository.save(Fixture.EVENT1);
        Action action1 = new Action(event, 1L);
        Action action2 = new Action(event, 2L);
        MemberAction memberAction1 = new MemberAction(action1, "토다리", MemberActionStatus.IN, 1L);
        MemberAction memberAction2 = new MemberAction(action2, "토다리", MemberActionStatus.OUT, 2L);
        memberActionRepository.saveAll(List.of(memberAction1, memberAction2));

        MemberActionsSaveAppRequest request = new MemberActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("토다리", "OUT")));

        List<MemberAction> unorderedMemberActions = List.of(memberAction2, memberAction1);
        CurrentMembers currentMembers = CurrentMembers.of(unorderedMemberActions);
        Action startAction = new Action(event, 3L);

        assertThatThrownBy(() -> memberActionFactory.createMemberActions(request, currentMembers, startAction))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("인원 변동 액션을 생성한다.")
    @Test
    void createMemberActionsTest1() {
        Event event = eventRepository.save(Fixture.EVENT1);
        Action action = new Action(event, 1L);
        MemberAction memberAction = new MemberAction(action, "토다리", MemberActionStatus.IN, 1L);
        memberActionRepository.save(memberAction);

        MemberActionsSaveAppRequest memberActionsSaveAppRequest = new MemberActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("토다리", "OUT")));
        Action startAction = new Action(event, 2L);

        CurrentMembers currentMembers = CurrentMembers.of(List.of(memberAction));
        List<MemberAction> memberActions = memberActionFactory.createMemberActions(memberActionsSaveAppRequest,
                                                                                   currentMembers, startAction
        );

        assertThat(memberActions).hasSize(1)
                .extracting(MemberAction::getAction, MemberAction::getMemberName, MemberAction::getStatus)
                .containsExactly(
                        tuple(startAction, "토다리", MemberActionStatus.OUT)
                );
    }

    @DisplayName("현재 행사에 참여 중인 경우에 퇴장할 수 있다.")
    @Test
    void createMemberActionsTest2() {
        Event event = eventRepository.save(Fixture.EVENT1);
        Action action = new Action(event, 1L);
        MemberAction memberAction = new MemberAction(action, "토다리", MemberActionStatus.IN, 1L);
        memberActionRepository.save(memberAction);

        MemberActionsSaveAppRequest request = new MemberActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("토다리", "OUT")));
        Action startAction = new Action(event, 2L);
        CurrentMembers currentMembers = CurrentMembers.of(List.of(memberAction));

        assertThatCode(() -> memberActionFactory.createMemberActions(request, currentMembers, startAction))
                .doesNotThrowAnyException();
    }

    @DisplayName("행사에서 퇴장한 경우에 입장할 수 있다.")
    @Test
    void createMemberActionsTest3() {
        Event event = eventRepository.save(Fixture.EVENT1);
        Action action1 = new Action(event, 1L);
        MemberAction memberAction1 = new MemberAction(action1, "토다리", MemberActionStatus.IN, 1L);
        memberActionRepository.save(memberAction1);
        Action action2 = new Action(event, 2L);
        MemberAction memberAction2 = new MemberAction(action2, "토다리", MemberActionStatus.OUT, 2L);
        memberActionRepository.save(memberAction2);

        MemberActionsSaveAppRequest request = new MemberActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("토다리", "IN")));
        Action startAction = new Action(event, 3L);
        CurrentMembers currentMembers = CurrentMembers.of(List.of(memberAction1, memberAction2));

        assertThatCode(() -> memberActionFactory.createMemberActions(request, currentMembers, startAction))
                .doesNotThrowAnyException();
    }

    @DisplayName("행사에 입장한 적 없는 경우에 입장할 수 있다.")
    @Test
    void createMemberActionsTest4() {
        Event event = eventRepository.save(Fixture.EVENT1);
        Action action = new Action(event, 1L);
        MemberAction memberAction = new MemberAction(action, "토다리", MemberActionStatus.IN, 1L);
        memberActionRepository.save(memberAction);

        MemberActionsSaveAppRequest request = new MemberActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("쿠키", "IN")));
        Action startAction = new Action(event, 2L);
        CurrentMembers currentMembers = CurrentMembers.of(List.of(memberAction));

        assertThatCode(() -> memberActionFactory.createMemberActions(request, currentMembers, startAction))
                .doesNotThrowAnyException();
    }

    @DisplayName("행사에 입장하지 않았을 경우 퇴장할 수 없다.")
    @Test
    void createMemberActionTest5() {
        Event event = eventRepository.save(Fixture.EVENT1);

        MemberActionsSaveAppRequest request = new MemberActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("쿠키", "OUT")));
        Action startAction = new Action(event, 2L);
        CurrentMembers currentMembers = CurrentMembers.of(List.of());

        assertThatCode(
                () -> memberActionFactory.createMemberActions(request, currentMembers, startAction))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("행사에 이미 참여 중인 경우 다시 입장할 수 없다.")
    @Test
    void createMemberActionTest6() {
        Event event = eventRepository.save(Fixture.EVENT1);
        Action action = new Action(event, 1L);
        MemberAction memberAction = new MemberAction(action, "쿠키", MemberActionStatus.IN, 1L);
        memberActionRepository.save(memberAction);

        MemberActionsSaveAppRequest request = new MemberActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("쿠키", "IN")));
        Action startAction = new Action(event, 2L);
        CurrentMembers currentMembers = CurrentMembers.of(List.of(memberAction));

        assertThatCode(() -> memberActionFactory.createMemberActions(request, currentMembers, startAction))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("한 명의 사용자는 동시에 여러 번 입장할 수 없다.")
    @Test
    void createMemberActionTest7() {
        Event event = eventRepository.save(Fixture.EVENT1);

        MemberActionsSaveAppRequest request = new MemberActionsSaveAppRequest(
                List.of(
                        new MemberActionSaveAppRequest("쿠키", "IN"),
                        new MemberActionSaveAppRequest("쿠키", "IN")
                ));
        Action startAction = new Action(event, 1L);
        CurrentMembers currentMembers = CurrentMembers.of(List.of());

        assertThatCode(
                () -> memberActionFactory.createMemberActions(request, currentMembers, startAction))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("한 명의 사용자는 동시에 여러 번 퇴장할 수 없다.")
    @Test
    void createMemberActionTest8() {
        Event event = eventRepository.save(Fixture.EVENT1);
        Action action = new Action(event, 1L);
        MemberAction memberAction = new MemberAction(action, "쿠키", MemberActionStatus.IN, 1L);
        memberActionRepository.save(memberAction);

        MemberActionsSaveAppRequest request = new MemberActionsSaveAppRequest(
                List.of(
                        new MemberActionSaveAppRequest("쿠키", "OUT"),
                        new MemberActionSaveAppRequest("쿠키", "OUT")
                ));
        Action startAction = new Action(event, 2L);
        CurrentMembers currentMembers = CurrentMembers.of(List.of(memberAction));

        assertThatCode(() -> memberActionFactory.createMemberActions(request, currentMembers, startAction))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("한 명의 사용자는 입장과 퇴장을 동시에 할 수 없다.")
    @Test
    void createMemberActionTest9() {
        Event event = eventRepository.save(Fixture.EVENT1);
        Action action = new Action(event, 1L);
        MemberAction memberAction = new MemberAction(action, "쿠키", MemberActionStatus.IN, 1L);
        memberActionRepository.save(memberAction);

        MemberActionsSaveAppRequest request = new MemberActionsSaveAppRequest(
                List.of(
                        new MemberActionSaveAppRequest("쿠키", "IN"),
                        new MemberActionSaveAppRequest("쿠키", "OUT")
                ));
        Action startAction = new Action(event, 2L);
        CurrentMembers currentMembers = CurrentMembers.of(List.of(memberAction));

        assertThatCode(() -> memberActionFactory.createMemberActions(request, currentMembers, startAction))
                .isInstanceOf(HaengdongException.class);
    }
}
