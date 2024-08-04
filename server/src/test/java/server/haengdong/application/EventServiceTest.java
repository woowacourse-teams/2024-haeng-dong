package server.haengdong.application;


import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.tuple;
import static org.mockito.BDDMockito.given;
import static server.haengdong.domain.action.MemberActionStatus.IN;
import static server.haengdong.domain.action.MemberActionStatus.OUT;

import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import server.haengdong.application.request.EventAppRequest;
import server.haengdong.application.response.ActionAppResponse;
import server.haengdong.application.response.EventAppResponse;
import server.haengdong.application.response.EventDetailAppResponse;
import server.haengdong.application.response.MembersAppResponse;
import server.haengdong.domain.action.Action;
import server.haengdong.domain.action.ActionRepository;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.BillActionRepository;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.domain.event.EventTokenProvider;

@SpringBootTest
class EventServiceTest {

    @Autowired
    private EventService eventService;

    @MockBean
    private EventTokenProvider eventTokenProvider;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ActionRepository actionRepository;

    @Autowired
    private BillActionRepository billActionRepository;

    @Autowired
    private MemberActionRepository memberActionRepository;

    @AfterEach
    void tearDown() {
        billActionRepository.deleteAllInBatch();
        memberActionRepository.deleteAllInBatch();
        actionRepository.deleteAllInBatch();
        eventRepository.deleteAllInBatch();
    }

    @DisplayName("행사를 생성한다")
    @Test
    void saveEventTest() {
        EventAppRequest request = new EventAppRequest("test");
        given(eventTokenProvider.createToken()).willReturn("TOKEN");

        EventAppResponse response = eventService.saveEvent(request);

        assertThat(response.token()).isEqualTo("TOKEN");
    }

    @DisplayName("토큰으로 행사를 조회한다.")
    @Test
    void findEventTest() {
        String token = "TOKEN";
        Event event = new Event("행동대장 회식", token);
        eventRepository.save(event);

        EventDetailAppResponse eventDetailAppResponse = eventService.findEvent(token);

        assertThat(eventDetailAppResponse.eventName()).isEqualTo("행동대장 회식");
    }

    @DisplayName("행사에 속한 모든 액션을 조회한다.")
    @Test
    void findActionsTest() {
        Event event = new Event("행동대장 회식", "웨디_토큰");
        Action action = new Action(event, 1L);
        MemberAction memberAction = new MemberAction(action, "토다리", IN, 1L);
        Action action1 = new Action(event, 2L);
        MemberAction memberAction1 = new MemberAction(action1, "쿠키", IN, 1L);
        Action action2 = new Action(event, 3L);
        BillAction billAction = new BillAction(action2, "뽕나무쟁이족발", 30000L);
        eventRepository.save(event);
        memberActionRepository.saveAll(List.of(memberAction, memberAction1));
        billActionRepository.save(billAction);

        List<ActionAppResponse> actionAppResponses = eventService.findActions("웨디_토큰");

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
        String token = "웨디_토큰";
        Event event = new Event("행동대장 회식", token);
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

        MembersAppResponse membersAppResponse = eventService.findAllMembers(token);

        assertThat(membersAppResponse.memberNames()).containsExactlyInAnyOrder("토다리", "쿠키");
    }
}
