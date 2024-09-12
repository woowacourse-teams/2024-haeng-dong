//package server.haengdong.application;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.assertj.core.api.Assertions.assertThatCode;
//import static org.assertj.core.api.Assertions.tuple;
//
//import java.util.List;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import server.haengdong.application.request.BillDetailUpdateAppRequest;
//import server.haengdong.application.request.BillDetailsUpdateAppRequest;
//import server.haengdong.application.response.BillDetailAppResponse;
//import server.haengdong.application.response.BillDetailsAppResponse;
//import server.haengdong.domain.action.Bill;
//import server.haengdong.domain.action.BillDetail;
//import server.haengdong.domain.action.BillRepository;
//import server.haengdong.domain.event.Event;
//import server.haengdong.domain.event.EventRepository;
//import server.haengdong.exception.HaengdongException;
//import server.haengdong.support.fixture.Fixture;
//
//class BillDetailServiceTest extends ServiceTestSupport {
//
//    @Autowired
//    private BillDetailService billDetailService;
//
//    @Autowired
//    private EventRepository eventRepository;
//
//    @Autowired
//    private BillRepository billActionRepository;
//
//    @Autowired
//    private BillActionDetailRepository billActionDetailRepository;
//
//    @DisplayName("참여자별 지출 금액을 조회한다.")
//    @Test
//    void findBillDetailsTest() {
//        Event event1 = Fixture.EVENT1;
//        eventRepository.save(event1);
//        Sequence sequence = Sequence.createFirst();
//        Bill billAction = new Bill(event1, sequence, "뽕족", 10000L);
//        billActionRepository.save(billAction);
//        BillDetail billActionDetail1 = new BillDetail(billAction, "토다리", 6000L, true);
//        BillDetail billActionDetail2 = new BillDetail(billAction, "쿠키", 4000L, true);
//        billActionDetailRepository.saveAll(List.of(billActionDetail1, billActionDetail2));
//
//        BillDetailsAppResponse response = billDetailService.findBillDetails(
//                event1.getToken(), billAction.getId());
//
//        assertThat(response.billDetails()).hasSize(2)
//                .extracting(BillDetailAppResponse::memberName, BillDetailAppResponse::price)
//                .containsExactly(
//                        tuple("토다리", 6000L),
//                        tuple("쿠키", 4000L)
//                );
//    }
//
//    @DisplayName("지출 금액 수정 요청의 총합이 지출 금액과 일치하지 않으면 예외가 발생한다.")
//    @Test
//    void updateBillDetailsTest1() {
//        Event event1 = Fixture.EVENT1;
//        eventRepository.save(event1);
//        Sequence sequence = Sequence.createFirst();
//        Bill billAction = new Bill(event1, sequence, "뽕족", 10000L);
//        billActionRepository.save(billAction);
//        BillDetail billActionDetail1 = new BillDetail(billAction, "토다리", 5000L, false);
//        BillDetail billActionDetail2 = new BillDetail(billAction, "쿠키", 5000L, false);
//        billActionDetailRepository.saveAll(List.of(billActionDetail1, billActionDetail2));
//
//        BillDetailsUpdateAppRequest request = new BillDetailsUpdateAppRequest(List.of(
//                new BillDetailUpdateAppRequest("토다리", 3000L, true),
//                new BillDetailUpdateAppRequest("쿠키", 4000L, true)
//        ));
//        assertThatCode(
//                () -> billDetailService.updateBillDetails(event1.getToken(), billAction.getId(), request))
//                .isInstanceOf(HaengdongException.class)
//                .hasMessage("지출 총액이 일치하지 않습니다.");
//    }
//
//    @DisplayName("지출 고정 금액을 수정한다.")
//    @Test
//    void updateBillDetailsTest2() {
//        Event event1 = Fixture.EVENT1;
//        eventRepository.save(event1);
//        Sequence sequence = Sequence.createFirst();
//        Bill billAction = new Bill(event1, sequence, "뽕족", 10000L);
//        billActionRepository.save(billAction);
//        BillDetail billActionDetail1 = new BillDetail(billAction, "토다리", 5000L, false);
//        BillDetail billActionDetail2 = new BillDetail(billAction, "쿠키", 5000L, false);
//        billActionDetailRepository.saveAll(List.of(billActionDetail1, billActionDetail2));
//
//        BillDetailsUpdateAppRequest request = new BillDetailsUpdateAppRequest(List.of(
//                new BillDetailUpdateAppRequest("토다리", 3000L, true),
//                new BillDetailUpdateAppRequest("쿠키", 7000L, true)
//        ));
//        billDetailService.updateBillDetails(event1.getToken(), billAction.getId(), request);
//
//        List<BillDetail> results = billActionDetailRepository.findAll();
//
//        assertThat(results).hasSize(2)
//                .extracting(BillDetail::getMemberName, BillDetail::getPrice)
//                .containsExactly(
//                        tuple("토다리", 3000L),
//                        tuple("쿠키", 7000L)
//                );
//    }
//}
