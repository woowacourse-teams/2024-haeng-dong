package server.haengdong.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.tuple;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import server.haengdong.application.request.BillActionDetailUpdateAppRequest;
import server.haengdong.application.request.BillActionDetailsUpdateAppRequest;
import server.haengdong.application.response.BillActionDetailAppResponse;
import server.haengdong.application.response.BillActionDetailsAppResponse;
import server.haengdong.domain.action.Action;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.BillActionDetail;
import server.haengdong.domain.action.BillActionDetailRepository;
import server.haengdong.domain.action.BillActionRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.exception.HaengdongException;
import server.haengdong.support.fixture.Fixture;

class BillActionDetailServiceTest extends ServiceTestSupport {

    @Autowired
    private BillActionDetailService billActionDetailService;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private BillActionRepository billActionRepository;

    @Autowired
    private BillActionDetailRepository billActionDetailRepository;

    @DisplayName("참여자별 지출 금액을 조회한다.")
    @Test
    void findBillActionDetailsTest() {
        Event event1 = Fixture.EVENT1;
        eventRepository.save(event1);
        Action action = new Action(event1, 1L);
        BillAction billAction = new BillAction(action, "뽕족", 10000L);
        billActionRepository.save(billAction);
        BillActionDetail billActionDetail1 = new BillActionDetail(billAction, "토다리", 6000L, true);
        BillActionDetail billActionDetail2 = new BillActionDetail(billAction, "쿠키", 4000L, true);
        billActionDetailRepository.saveAll(List.of(billActionDetail1, billActionDetail2));

        BillActionDetailsAppResponse response = billActionDetailService.findBillActionDetails(
                event1.getToken(), action.getId());

        assertThat(response.billActionDetailAppResponses()).hasSize(2)
                .extracting(BillActionDetailAppResponse::name, BillActionDetailAppResponse::price)
                .containsExactly(
                        tuple("토다리", 6000L),
                        tuple("쿠키", 4000L)
                );
    }

    @DisplayName("지출 금액 수정 요청의 총합이 지출 금액과 일치하지 않으면 예외가 발생한다.")
    @Test
    void updateBillActionDetailsTest1() {
        Event event1 = Fixture.EVENT1;
        eventRepository.save(event1);
        Action action = new Action(event1, 1L);
        BillAction billAction = new BillAction(action, "뽕족", 10000L);
        billActionRepository.save(billAction);
        BillActionDetail billActionDetail1 = new BillActionDetail(billAction, "토다리", 5000L, false);
        BillActionDetail billActionDetail2 = new BillActionDetail(billAction, "쿠키", 5000L, false);
        billActionDetailRepository.saveAll(List.of(billActionDetail1, billActionDetail2));

        BillActionDetailsUpdateAppRequest request = new BillActionDetailsUpdateAppRequest(List.of(
                new BillActionDetailUpdateAppRequest("토다리", 3000L, true),
                new BillActionDetailUpdateAppRequest("쿠키", 4000L, true)
        ));
        assertThatCode(
                () -> billActionDetailService.updateBillActionDetails(event1.getToken(), action.getId(), request))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("지출 총액이 일치하지 않습니다.");
    }

    @DisplayName("지출 고정 금액을 수정한다.")
    @Test
    void updateBillActionDetailsTest2() {
        Event event1 = Fixture.EVENT1;
        eventRepository.save(event1);
        Action action = new Action(event1, 1L);
        BillAction billAction = new BillAction(action, "뽕족", 10000L);
        billActionRepository.save(billAction);
        BillActionDetail billActionDetail1 = new BillActionDetail(billAction, "토다리", 5000L, false);
        BillActionDetail billActionDetail2 = new BillActionDetail(billAction, "쿠키", 5000L, false);
        billActionDetailRepository.saveAll(List.of(billActionDetail1, billActionDetail2));

        BillActionDetailsUpdateAppRequest request = new BillActionDetailsUpdateAppRequest(List.of(
                new BillActionDetailUpdateAppRequest("토다리", 3000L, true),
                new BillActionDetailUpdateAppRequest("쿠키", 7000L, true)
        ));
        billActionDetailService.updateBillActionDetails(event1.getToken(), action.getId(), request);

        List<BillActionDetail> results = billActionDetailRepository.findAll();

        assertThat(results).hasSize(2)
                .extracting(BillActionDetail::getMemberName, BillActionDetail::getPrice)
                .containsExactly(
                        tuple("토다리", 3000L),
                        tuple("쿠키", 7000L)
                );
    }
}
