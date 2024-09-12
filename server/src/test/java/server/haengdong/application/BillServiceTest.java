//package server.haengdong.application;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.assertj.core.api.Assertions.assertThatThrownBy;
//import static org.assertj.core.api.Assertions.tuple;
//import static org.junit.jupiter.api.Assertions.assertAll;
//
//import java.util.List;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import server.haengdong.application.request.BillAppRequest;
//import server.haengdong.application.request.BillActionUpdateAppRequest;
//import server.haengdong.domain.action.Bill;
//import server.haengdong.domain.action.BillDetail;
//import server.haengdong.domain.action.BillRepository;
//import server.haengdong.domain.event.Event;
//import server.haengdong.domain.event.EventRepository;
//import server.haengdong.exception.HaengdongException;
//import server.haengdong.support.fixture.Fixture;
//
//class BillServiceTest extends ServiceTestSupport {
//
//    @Autowired
//    private BillService billService;
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
//    @Autowired
//    private MemberActionRepository memberActionRepository;
//
//    @DisplayName("지출 내역을 생성한다.")
//    @Test
//    void saveBillAction() {
//        Event event = Fixture.EVENT1;
//        Event savedEvent = eventRepository.save(event);
//        Sequence sequence1 = Sequence.createFirst();
//        Sequence sequence2 = sequence1.next();
//        MemberAction memberAction1 = new MemberAction(event, sequence1, "백호", MemberActionStatus.IN);
//        MemberAction memberAction2 = new MemberAction(event, sequence2, "망쵸", MemberActionStatus.IN);
//        memberActionRepository.saveAll(List.of(memberAction1, memberAction2));
//
//        List<BillAppRequest> requests = List.of(
//                new BillAppRequest("뽕족", 10_000L),
//                new BillAppRequest("인생맥주", 15_000L)
//        );
//
//        billService.saveAllBillAction(event.getToken(), requests);
//
//        List<Bill> actions = billActionRepository.findByEvent(savedEvent);
//
//        assertThat(actions).extracting(Bill::getTitle, Bill::getPrice, Bill::getSequence)
//                .containsExactlyInAnyOrder(
//                        tuple("뽕족", 10_000L, new Sequence(3L)),
//                        tuple("인생맥주", 15_000L, new Sequence(4L))
//                );
//    }
//
//    @DisplayName("지출 내역을 생성하면 지출 상세 내역이 생성된다.")
//    @Test
//    void saveBillActionTest1() {
//        Event event = Fixture.EVENT1;
//        Event savedEvent = eventRepository.save(event);
//        Sequence sequence1 = Sequence.createFirst();
//        Sequence sequence2 = sequence1.next();
//        MemberAction memberAction1 = new MemberAction(event, sequence1, "백호", MemberActionStatus.IN);
//        MemberAction memberAction2 = new MemberAction(event, sequence2, "망쵸", MemberActionStatus.IN);
//        memberActionRepository.saveAll(List.of(memberAction1, memberAction2));
//
//        List<BillAppRequest> request = List.of(
//                new BillAppRequest("뽕족", 10_000L),
//                new BillAppRequest("인생맥주", 15_000L)
//        );
//
//        billService.saveAllBillAction(event.getToken(), request);
//
//        List<BillDetail> billActionDetails = billActionDetailRepository.findAll();
//
//        assertThat(billActionDetails)
//                .hasSize(4)
//                .extracting("memberName", "price")
//                .containsExactlyInAnyOrder(
//                        tuple("백호", 5_000L),
//                        tuple("망쵸", 5_000L),
//                        tuple("백호", 7_500L),
//                        tuple("망쵸", 7_500L)
//                );
//    }
//
//    @DisplayName("이벤트가 존재하지 않으면 지출 내역을 생성할 수 없다.")
//    @Test
//    void saveBillAction1() {
//        List<BillAppRequest> requests = List.of(
//                new BillAppRequest("뽕족", 10_000L),
//                new BillAppRequest("인생맥주", 15_000L)
//        );
//
//        assertThatThrownBy(() -> billService.saveAllBillAction("token", requests))
//                .isInstanceOf(HaengdongException.class);
//    }
//
//    @DisplayName("지출 액션을 수정한다.")
//    @Test
//    void updateBillAction() {
//        Event event = Fixture.EVENT1;
//        Event savedEvent = eventRepository.save(event);
//        Sequence sequence = Sequence.createFirst();
//        Bill billAction = new Bill(event, sequence, "뽕족", 10_000L);
//        Bill savedBillAction = billActionRepository.save(billAction);
//
//        Long actionId = savedBillAction.getId();
//        BillActionUpdateAppRequest request = new BillActionUpdateAppRequest("인생맥주", 20_000L);
//
//        billService.updateBillAction(event.getToken(), actionId, request);
//
//        Bill updatedBillAction = billActionRepository.findById(savedBillAction.getId()).get();
//
//        assertAll(
//                () -> assertThat(updatedBillAction.getTitle()).isEqualTo("인생맥주"),
//                () -> assertThat(updatedBillAction.getPrice()).isEqualTo(20_000L)
//        );
//    }
//
//    @DisplayName("행사에 속하지 않은 지출 액션은 수정할 수 없다.")
//    @Test
//    void updateBillAction1() {
//        Event event1 = Fixture.EVENT1;
//        Event event2 = Fixture.EVENT2;
//        Event savedEvent1 = eventRepository.save(event1);
//        Event savedEvent2 = eventRepository.save(event2);
//        Sequence sequence1 = Sequence.createFirst();
//        Sequence sequence2 = Sequence.createFirst();
//        Bill billAction1 = new Bill(event1, sequence1, "뽕족", 10_000L);
//        Bill billAction2 = new Bill(event2, sequence2, "뽕족", 10_000L);
//        Bill savedBillAction1 = billActionRepository.save(billAction1);
//        billActionRepository.save(billAction2);
//
//        Long actionId = savedBillAction1.getId();
//        BillActionUpdateAppRequest request = new BillActionUpdateAppRequest("인생맥주", 20_000L);
//
//        assertThatThrownBy(() -> billService.updateBillAction(event2.getToken(), actionId, request))
//                .isInstanceOf(HaengdongException.class);
//    }
//
//    @DisplayName("지출 내역 금액을 변경하면 지출 디테일이 초기화 된다.")
//    @Test
//    void updateBillAction2() {
//        Event event = Fixture.EVENT1;
//        Event savedEvent = eventRepository.save(event);
//        Sequence sequence = Sequence.createFirst();
//        Bill billAction = new Bill(event, sequence, "뽕족", 10_000L);
//        BillDetail billActionDetail1 = new BillDetail(billAction, "감자", 3000L, true);
//        BillDetail billActionDetail2 = new BillDetail(billAction, "고구마", 2000L, true);
//        BillDetail billActionDetail3 = new BillDetail(billAction, "당근", 3000L, true);
//        BillDetail billActionDetail4 = new BillDetail(billAction, "양파", 2000L, true);
//        billAction.addDetails(List.of(billActionDetail1, billActionDetail2, billActionDetail3, billActionDetail4));
//        Bill savedBillAction = billActionRepository.save(billAction);
//
//        Long actionId = savedBillAction.getId();
//        BillActionUpdateAppRequest request = new BillActionUpdateAppRequest("인생맥주", 20_000L);
//
//        billService.updateBillAction(event.getToken(), actionId, request);
//
//        Bill updatedBillAction = billActionRepository.findById(savedBillAction.getId()).get();
//        List<BillDetail> billActionDetails = billActionDetailRepository.findAllByBill(updatedBillAction);
//
//        assertThat(billActionDetails).hasSize(4)
//                .extracting("memberName", "price")
//                .containsExactlyInAnyOrder(
//                        tuple("감자", 5000L),
//                        tuple("고구마", 5000L),
//                        tuple("당근", 5000L),
//                        tuple("양파", 5000L)
//                );
//    }
//
//    @DisplayName("지출 내역을 삭제한다.")
//    @Test
//    void deleteBillAction() {
//        Event event = Fixture.EVENT1;
//        eventRepository.save(event);
//        Bill billAction = Fixture.createBillAction(event, 1L, "커피", 50_900L);
//        billActionRepository.save(billAction);
//        Long actionId = billAction.getId();
//
//        billService.deleteBillAction(event.getToken(), actionId);
//
//        assertThat(billActionRepository.findById(billAction.getId())).isEmpty();
//    }
//
//    @DisplayName("지출 내역을 삭제하면 지출 상세도 삭제된다.")
//    @Test
//    void deleteBillActionTest1() {
//        Event event = Fixture.EVENT1;
//        eventRepository.save(event);
//        MemberAction memberAction1 = Fixture.createMemberAction(event, 1L, "백호", MemberActionStatus.IN);
//        MemberAction memberAction2 = Fixture.createMemberAction(event, 2L, "망쵸", MemberActionStatus.IN);
//        Bill billAction = Fixture.createBillAction(event, 3L, "커피", 50_900L);
//        BillDetail billActionDetail1 = new BillDetail(billAction, "백호", 25_450L, false);
//        BillDetail billActionDetail2 = new BillDetail(billAction, "망쵸", 25_450L, false);
//        memberActionRepository.saveAll(List.of(memberAction1, memberAction2));
//        billActionRepository.save(billAction);
//        billActionDetailRepository.saveAll(List.of(billActionDetail1, billActionDetail2));
//        Long actionId = billAction.getId();
//
//        billService.deleteBillAction(event.getToken(), actionId);
//
//        assertThat(billActionDetailRepository.findAll()).isEmpty();
//    }
//
//    @DisplayName("지출 내역 삭제 시 행사가 존재하지 않으면 예외가 발생한다.")
//    @Test
//    void deleteBillAction1() {
//        assertThatThrownBy(() -> billService.deleteBillAction("소하망쵸", 1L))
//                .isInstanceOf(HaengdongException.class);
//    }
//}
