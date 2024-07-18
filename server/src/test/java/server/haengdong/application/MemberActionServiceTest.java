package server.haengdong.application;

import static org.assertj.core.api.Assertions.assertThatCode;

import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import server.haengdong.application.request.MemberActionSaveAppRequest;
import server.haengdong.application.request.MemberActionSaveListAppRequest;
import server.haengdong.domain.Action;
import server.haengdong.domain.Event;
import server.haengdong.domain.MemberAction;
import server.haengdong.domain.MemberActionStatus;
import server.haengdong.persistence.ActionRepository;
import server.haengdong.persistence.EventRepository;
import server.haengdong.persistence.MemberActionRepository;

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

    @DisplayName("현재 행사에 참여하고 있는 경우에 나갈 수 있다")
    @Test
    void saveMemberActionTest() {
        Event event = eventRepository.save(new Event("test", "TOKEN"));
        Action action = actionRepository.save(new Action(event, 1L));
        MemberAction memberAction = new MemberAction("망쵸", MemberActionStatus.IN, 1L);
        memberAction.setAction(action);
        memberActionRepository.save(memberAction);

        assertThatCode(() -> memberActionService.saveMemberAction("TOKEN", new MemberActionSaveListAppRequest(
                List.of(new MemberActionSaveAppRequest("망쵸", "OUT")), 2L)))
                .doesNotThrowAnyException();
    }

    @DisplayName("행사에서 퇴장한 경우에 입장할 수 있다")
    @Test
    void saveMemberActionTest1() {
        Event event = eventRepository.save(new Event("test", "TOKEN"));
        Action actionOne = actionRepository.save(new Action(event, 1L));
        MemberAction memberActionOne = new MemberAction("망쵸", MemberActionStatus.IN, 1L);
        memberActionOne.setAction(actionOne);
        memberActionRepository.save(memberActionOne);
        Action actionTwo = actionRepository.save(new Action(event, 2L));
        MemberAction memberActionTwo = new MemberAction("망쵸", MemberActionStatus.OUT, 1L);
        memberActionTwo.setAction(actionTwo);
        memberActionRepository.save(memberActionTwo);

        assertThatCode(() -> memberActionService.saveMemberAction("TOKEN", new MemberActionSaveListAppRequest(
                List.of(new MemberActionSaveAppRequest("망쵸", "IN")), 3L)))
                .doesNotThrowAnyException();
    }

    @DisplayName("입장하지 않았을 경우 들어올 수 없다")
    @Test
    void saveMemberActionTest2() {
        assertThatCode(() -> memberActionService.saveMemberAction("TOKEN", new MemberActionSaveListAppRequest(
                List.of(new MemberActionSaveAppRequest("TOKEN", "OUT")), 1L)))
                .isInstanceOf(IllegalArgumentException.class);
    }
}
