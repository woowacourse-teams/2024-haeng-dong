package server.haengdong.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import server.haengdong.application.request.BillActionAppRequest;
import server.haengdong.domain.BillAction;
import server.haengdong.domain.Event;
import server.haengdong.persistence.BillActionRepository;
import server.haengdong.persistence.EventRepository;

@SpringBootTest
class BillActionServiceTest {

    @Autowired
    private BillActionService billActionService;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private BillActionRepository billActionRepository;

    @DisplayName("지출 내역을 생성한다.")
    @Test
    void saveAllBillAction() {
        String token = "TOKEN";
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
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("존재하지 않는 이벤트 토큰입니다.");
    }
}
