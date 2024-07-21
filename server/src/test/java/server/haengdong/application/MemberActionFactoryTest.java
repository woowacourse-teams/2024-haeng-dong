package server.haengdong.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import server.haengdong.application.request.MemberActionSaveAppRequest;
import server.haengdong.application.request.MemberActionsSaveAppRequest;
import server.haengdong.domain.Action;
import server.haengdong.domain.Event;
import server.haengdong.domain.MemberAction;
import server.haengdong.domain.MemberActionStatus;
import server.haengdong.persistence.ActionRepository;
import server.haengdong.persistence.EventRepository;
import server.haengdong.persistence.MemberActionRepository;

@SpringBootTest
class MemberActionFactoryTest {

    @Autowired
    private MemberActionFactory memberActionFactory;

    @Autowired
    private MemberActionRepository memberActionRepository;

    @Autowired
    private ActionRepository actionRepository;

    @Autowired
    private EventRepository eventRepository;

    @AfterEach
    void tearDown() {
        memberActionRepository.deleteAllInBatch();
        actionRepository.deleteAllInBatch();
        eventRepository.deleteAllInBatch();
    }

    @DisplayName("액션 ID를 기준으로 정렬한 상태로 새로운 멤버 액션 요청을 검증한다.")
    @Test
    void createMemberActionsTest() {
        Event event = eventRepository.save(new Event("우당탕탕 행동대장 백엔드 회식", "토다리_토큰"));
        Action action1 = new Action(event, 1L);
        Action action2 = new Action(event, 2L);
        MemberAction memberAction1 = new MemberAction(action1, "토다리", MemberActionStatus.IN, 1L);
        MemberAction memberAction2 = new MemberAction(action2, "토다리", MemberActionStatus.OUT, 2L);
        memberActionRepository.saveAll(List.of(memberAction1, memberAction2));

        MemberActionsSaveAppRequest request = new MemberActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("토다리", "OUT")));
        List<MemberAction> unorderedMemberActions = Arrays.asList(memberAction2, memberAction1);
        Action startAction = new Action(event, 3L);

        assertThatThrownBy(() -> memberActionFactory.createMemberActions(request, unorderedMemberActions, startAction))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @DisplayName("인원 변동 액션을 생성한다.")
    @Test
    void createMemberActionsTest1() {
        Event event = eventRepository.save(new Event("우당탕탕 행동대장 백엔드 회식", "토다리_토큰"));
        Action action = new Action(event, 1L);
        MemberAction memberAction = new MemberAction(action, "토다리", MemberActionStatus.IN, 1L);
        memberActionRepository.save(memberAction);

        MemberActionsSaveAppRequest memberActionsSaveAppRequest = new MemberActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("토다리", "OUT")));

        List<MemberAction> memberActions = memberActionFactory.createMemberActions(memberActionsSaveAppRequest,
                                                                                   List.of(memberAction), action);

        assertThat(memberActions).hasSize(1)
                .extracting("action", "memberName", "status")
                .containsExactly(
                        tuple(action, "토다리", MemberActionStatus.OUT)
                );
    }

    @DisplayName("현재 행사에 참여 중인 경우에 퇴장할 수 있다.")
    @Test
    void createMemberActionsTest2() {
        Event event = eventRepository.save(new Event("test", "TOKEN"));
        Action action = new Action(event, 1L);
        MemberAction memberAction = new MemberAction(action, "토다리", MemberActionStatus.IN, 1L);
        memberActionRepository.save(memberAction);

        MemberActionsSaveAppRequest request = new MemberActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("토다리", "OUT")));
        Action startAction = new Action(event, 2L);

        assertThatCode(() -> memberActionFactory.createMemberActions(request, List.of(memberAction), startAction))
                .doesNotThrowAnyException();
    }

    @DisplayName("행사에서 퇴장한 경우에 입장할 수 있다.")
    @Test
    void createMemberActionsTest3() {
        Event event = eventRepository.save(new Event("test", "TOKEN"));
        Action action1 = new Action(event, 1L);
        MemberAction memberAction1 = new MemberAction(action1, "토다리", MemberActionStatus.IN, 1L);
        memberActionRepository.save(memberAction1);
        Action action2 = new Action(event, 2L);
        MemberAction memberAction2 = new MemberAction(action2, "토다리", MemberActionStatus.OUT, 2L);
        memberActionRepository.save(memberAction2);

        MemberActionsSaveAppRequest request = new MemberActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("토다리", "IN")));
        Action startAction = new Action(event, 3L);

        assertThatCode(
                () -> memberActionFactory.createMemberActions(request, Arrays.asList(memberAction1, memberAction2),
                                                              startAction))
                .doesNotThrowAnyException();
    }

    @DisplayName("행사에 입장한 적 없는 경우에 입장할 수 있다.")
    @Test
    void createMemberActionsTest4() {
        Event event = eventRepository.save(new Event("test", "TOKEN"));
        Action action = new Action(event, 1L);
        MemberAction memberAction = new MemberAction(action, "토다리", MemberActionStatus.IN, 1L);
        memberActionRepository.save(memberAction);

        MemberActionsSaveAppRequest request = new MemberActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("쿠키", "IN")));
        Action startAction = new Action(event, 2L);

        assertThatCode(() -> memberActionFactory.createMemberActions(request, List.of(memberAction), startAction))
                .doesNotThrowAnyException();
    }

    @DisplayName("행사에 입장하지 않았을 경우 퇴장할 수 없다.")
    @Test
    void createMemberActionTest5() {
        Event event = eventRepository.save(new Event("test", "TOKEN"));

        MemberActionsSaveAppRequest request = new MemberActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("쿠키", "OUT")));
        Action startAction = new Action(event, 2L);

        assertThatCode(() -> memberActionFactory.createMemberActions(request, new ArrayList<>(), startAction))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @DisplayName("행사에 이미 참여 중인 경우 다시 입장할 수 없다.")
    @Test
    void createMemberActionTest6() {
        Event event = eventRepository.save(new Event("test", "TOKEN"));
        Action action = new Action(event, 1L);
        MemberAction memberAction = new MemberAction(action, "쿠키", MemberActionStatus.IN, 1L);
        memberActionRepository.save(memberAction);

        MemberActionsSaveAppRequest request = new MemberActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("쿠키", "IN")));
        Action startAction = new Action(event, 2L);

        assertThatCode(() -> memberActionFactory.createMemberActions(request, List.of(memberAction), startAction))
                .isInstanceOf(IllegalArgumentException.class);
    }
}
