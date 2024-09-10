package server.haengdong.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import server.haengdong.application.request.MemberActionSaveAppRequest;
import server.haengdong.domain.action.CurrentMembers;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionRepository;
import server.haengdong.domain.action.MemberActionStatus;
import server.haengdong.domain.action.Sequence;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.exception.HaengdongException;
import server.haengdong.support.fixture.Fixture;

class MemberActionFactoryTest extends ServiceTestSupport {

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
        MemberAction memberAction1 = Fixture.createMemberAction(event, 1L, "토다리", MemberActionStatus.IN);
        MemberAction memberAction2 = Fixture.createMemberAction(event, 2L, "토다리", MemberActionStatus.OUT);
        memberActionRepository.saveAll(List.of(memberAction1, memberAction2));

        MemberInActionsSaveAppRequest request = new MemberInActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("토다리", "OUT")));

        List<MemberAction> unorderedMemberActions = List.of(memberAction2, memberAction1);
        CurrentMembers currentMembers = CurrentMembers.of(unorderedMemberActions);
        Sequence sequence = new Sequence(3L);

        assertThatThrownBy(() -> memberActionFactory.createMemberActions(event, request, currentMembers, sequence))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("인원 변동 액션을 생성한다.")
    @Test
    void createMemberActionsTest1() {
        Event event = eventRepository.save(Fixture.EVENT1);
        MemberAction memberAction = Fixture.createMemberAction(event, 1L, "토다리", MemberActionStatus.IN);
        memberActionRepository.save(memberAction);

        MemberInActionsSaveAppRequest memberActionsSaveInAppRequest = new MemberInActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("토다리", "OUT")));
        Sequence sequence = new Sequence(2L);

        CurrentMembers currentMembers = CurrentMembers.of(List.of(memberAction));
        List<MemberAction> memberActions = memberActionFactory.createMemberActions(event, memberActionsSaveInAppRequest,
                currentMembers, sequence
        );

        assertThat(memberActions).hasSize(1)
                .extracting(MemberAction::getEvent, MemberAction::getSequence, MemberAction::getMemberName,
                        MemberAction::getStatus)
                .containsExactly(
                        tuple(event, sequence, "토다리", MemberActionStatus.OUT)
                );
    }

    @DisplayName("현재 행사에 참여 중인 경우에 퇴장할 수 있다.")
    @Test
    void createMemberActionsTest2() {
        Event event = eventRepository.save(Fixture.EVENT1);
        MemberAction memberAction = Fixture.createMemberAction(event, 1L, "토다리", MemberActionStatus.IN);
        memberActionRepository.save(memberAction);

        MemberInActionsSaveAppRequest request = new MemberInActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("토다리", "OUT")));
        Sequence sequence = new Sequence(2L);
        CurrentMembers currentMembers = CurrentMembers.of(List.of(memberAction));

        assertThatCode(() -> memberActionFactory.createMemberActions(event, request, currentMembers, sequence))
                .doesNotThrowAnyException();
    }

    @DisplayName("행사에서 퇴장한 경우에 입장할 수 있다.")
    @Test
    void createMemberActionsTest3() {
        Event event = eventRepository.save(Fixture.EVENT1);
        MemberAction memberAction1 = Fixture.createMemberAction(event, 1L, "토다리", MemberActionStatus.IN);
        memberActionRepository.save(memberAction1);
        MemberAction memberAction2 = Fixture.createMemberAction(event, 2L, "토다리", MemberActionStatus.OUT);
        memberActionRepository.save(memberAction2);

        MemberInActionsSaveAppRequest request = new MemberInActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("토다리", "IN")));
        Sequence sequence = new Sequence(3L);
        CurrentMembers currentMembers = CurrentMembers.of(List.of(memberAction1, memberAction2));

        assertThatCode(() -> memberActionFactory.createMemberActions(event, request, currentMembers, sequence))
                .doesNotThrowAnyException();
    }

    @DisplayName("행사에 입장한 적 없는 경우에 입장할 수 있다.")
    @Test
    void createMemberActionsTest4() {
        Event event = eventRepository.save(Fixture.EVENT1);
        MemberAction memberAction = Fixture.createMemberAction(event, 1L, "토다리", MemberActionStatus.IN);
        memberActionRepository.save(memberAction);

        MemberInActionsSaveAppRequest request = new MemberInActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("쿠키", "IN")));
        Sequence sequence = new Sequence(2L);
        CurrentMembers currentMembers = CurrentMembers.of(List.of(memberAction));

        assertThatCode(() -> memberActionFactory.createMemberActions(event, request, currentMembers, sequence))
                .doesNotThrowAnyException();
    }

    @DisplayName("행사에 입장하지 않았을 경우 퇴장할 수 없다.")
    @Test
    void createMemberActionTest5() {
        Event event = eventRepository.save(Fixture.EVENT1);

        MemberInActionsSaveAppRequest request = new MemberInActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("쿠키", "OUT")));
        Sequence sequence = new Sequence(2L);
        CurrentMembers currentMembers = CurrentMembers.of(List.of());

        assertThatCode(
                () -> memberActionFactory.createMemberActions(event, request, currentMembers, sequence))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("행사에 이미 참여 중인 경우 다시 입장할 수 없다.")
    @Test
    void createMemberActionTest6() {
        Event event = eventRepository.save(Fixture.EVENT1);
        MemberAction memberAction = Fixture.createMemberAction(event, 1L, "쿠키", MemberActionStatus.IN);
        memberActionRepository.save(memberAction);

        MemberInActionsSaveAppRequest request = new MemberInActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("쿠키", "IN")));
        Sequence sequence = new Sequence(2L);
        CurrentMembers currentMembers = CurrentMembers.of(List.of(memberAction));

        assertThatCode(() -> memberActionFactory.createMemberActions(event, request, currentMembers, sequence))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("한 명의 사용자는 동시에 여러 번 입장할 수 없다.")
    @Test
    void createMemberActionTest7() {
        Event event = eventRepository.save(Fixture.EVENT1);

        MemberInActionsSaveAppRequest request = new MemberInActionsSaveAppRequest(
                List.of(
                        new MemberActionSaveAppRequest("쿠키", "IN"),
                        new MemberActionSaveAppRequest("쿠키", "IN")
                ));
        Sequence sequence = new Sequence(1L);
        CurrentMembers currentMembers = CurrentMembers.of(List.of());

        assertThatCode(
                () -> memberActionFactory.createMemberActions(event, request, currentMembers, sequence))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("한 명의 사용자는 동시에 여러 번 퇴장할 수 없다.")
    @Test
    void createMemberActionTest8() {
        Event event = eventRepository.save(Fixture.EVENT1);
        Sequence sequence1 = new Sequence(1L);
        MemberAction memberAction = new MemberAction(event, sequence1, "쿠키", MemberActionStatus.IN);
        memberActionRepository.save(memberAction);

        MemberInActionsSaveAppRequest request = new MemberInActionsSaveAppRequest(
                List.of(
                        new MemberActionSaveAppRequest("쿠키", "OUT"),
                        new MemberActionSaveAppRequest("쿠키", "OUT")
                ));
        Sequence sequence2 = new Sequence(2L);
        CurrentMembers currentMembers = CurrentMembers.of(List.of(memberAction));

        assertThatCode(() -> memberActionFactory.createMemberActions(event, request, currentMembers, sequence2))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("한 명의 사용자는 입장과 퇴장을 동시에 할 수 없다.")
    @Test
    void createMemberActionTest9() {
        Event event = eventRepository.save(Fixture.EVENT1);
        Sequence sequence = new Sequence(1L);
        MemberAction memberAction = new MemberAction(event, sequence, "쿠키", MemberActionStatus.IN);
        memberActionRepository.save(memberAction);

        MemberInActionsSaveAppRequest request = new MemberInActionsSaveAppRequest(
                List.of(
                        new MemberActionSaveAppRequest("쿠키", "IN"),
                        new MemberActionSaveAppRequest("쿠키", "OUT")
                ));
        Sequence sequence2 = new Sequence(2L);
        CurrentMembers currentMembers = CurrentMembers.of(List.of(memberAction));

        assertThatCode(() -> memberActionFactory.createMemberActions(event, request, currentMembers, sequence2))
                .isInstanceOf(HaengdongException.class);
    }
}
