package server.haengdong.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import server.haengdong.application.request.BillActionAppRequest;
import server.haengdong.application.request.BillActionUpdateAppRequest;
import server.haengdong.domain.action.Action;
import server.haengdong.domain.action.ActionRepository;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.BillActionRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.exception.HaengdongException;

@SpringBootTest
class BillActionServiceTest {

    @Autowired
    private BillActionService billActionService;

    @Autowired
    private ActionRepository actionRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private BillActionRepository billActionRepository;

    @AfterEach
    void tearDown() {
        billActionRepository.deleteAllInBatch();
        actionRepository.deleteAllInBatch();
        eventRepository.deleteAllInBatch();
    }

    @DisplayName("지출 내역을 생성한다.")
    @Test
    void saveAllBillAction() {
        String token = "TOKEN2";
        Event event = new Event("감자", token);
        Event savedEvent = eventRepository.save(event);

        List<BillActionAppRequest> requests = List.of(
                new BillActionAppRequest("뽕족", 10_000L),
                new BillActionAppRequest("인생맥주", 15_000L)
        );

        billActionService.saveAllBillAction(token, requests);

        List<BillAction> actions = billActionRepository.findByAction_Event(savedEvent);

        assertThat(actions).extracting(BillAction::getTitle, BillAction::getPrice, BillAction::getSequence)
                .containsExactlyInAnyOrder(
                        tuple("뽕족", 10_000L, 1L),
                        tuple("인생맥주", 15_000L, 2L)
                );
    }

    @DisplayName("이벤트가 존재하지 않으면 지출 내역을 생성할 수 없다.")
    @Test
    void saveAllBillAction1() {
        List<BillActionAppRequest> requests = List.of(
                new BillActionAppRequest("뽕족", 10_000L),
                new BillActionAppRequest("인생맥주", 15_000L)
        );

        assertThatThrownBy(() -> billActionService.saveAllBillAction("token", requests))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("지출 액션을 수정한다.")
    @Test
    void updateBillAction() {
        String token = "TOKEN";
        Event event = new Event("감자", token);
        Event savedEvent = eventRepository.save(event);
        Action action = Action.createFirst(savedEvent);
        BillAction billAction = new BillAction(action, "뽕족", 10_000L);
        BillAction savedBillAction = billActionRepository.save(billAction);

        Long actionId = savedBillAction.getAction().getId();
        BillActionUpdateAppRequest request = new BillActionUpdateAppRequest("인생맥주", 20_000L);

        billActionService.updateBillAction(token, actionId, request);

        BillAction updatedBillAction = billActionRepository.findById(savedBillAction.getId()).get();

        assertAll(
                () -> assertThat(updatedBillAction.getTitle()).isEqualTo("인생맥주"),
                () -> assertThat(updatedBillAction.getPrice()).isEqualTo(20_000L)
        );
    }

    @DisplayName("행사에 속하지 않은 지출 액션은 수정할 수 없다.")
    @Test
    void updateBillAction1() {
        String token1 = "쿠키 토큰";
        String token2 = "웨디 토큰";
        Event event1 = new Event("감자1", token1);
        Event event2 = new Event("감자2", token2);
        Event savedEvent1 = eventRepository.save(event1);
        Event savedEvent2 = eventRepository.save(event2);
        Action action1 = Action.createFirst(savedEvent1);
        Action action2 = Action.createFirst(savedEvent2);
        BillAction billAction1 = new BillAction(action1, "뽕족", 10_000L);
        BillAction billAction2 = new BillAction(action2, "뽕족", 10_000L);
        BillAction savedBillAction1 = billActionRepository.save(billAction1);
        billActionRepository.save(billAction2);

        Long actionId = savedBillAction1.getAction().getId();
        BillActionUpdateAppRequest request = new BillActionUpdateAppRequest("인생맥주", 20_000L);

        assertThatThrownBy(() -> billActionService.updateBillAction(token2, actionId, request))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("지출 내역을 삭제한다.")
    @Test
    void deleteBillAction() {
        String token = "토다리 토큰";
        Event event = new Event("감자", token);
        eventRepository.save(event);
        BillAction billAction = new BillAction(new Action(event, 1L), "커피", 50_900L);
        billActionRepository.save(billAction);
        Long actionId = billAction.getAction().getId();

        billActionService.deleteBillAction(token, actionId);

        assertThat(billActionRepository.findById(billAction.getId())).isEmpty();
    }

    @DisplayName("지출 내역 삭제 시 행사가 존재하지 않으면 예외가 발생한다.")
    @Test
    void deleteBillAction1() {
        assertThatThrownBy(() -> billActionService.deleteBillAction("소하망쵸", 1L))
                .isInstanceOf(HaengdongException.class);
    }
}
