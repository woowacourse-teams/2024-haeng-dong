package server.haengdong.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import server.haengdong.application.request.BillDetailUpdateAppRequest;
import server.haengdong.application.request.BillDetailsUpdateAppRequest;
import server.haengdong.application.response.BillAppResponse;
import server.haengdong.application.response.MemberAppResponse;
import server.haengdong.application.response.StepAppResponse;
import server.haengdong.domain.action.Bill;
import server.haengdong.domain.action.BillDetail;
import server.haengdong.domain.action.BillDetailRepository;
import server.haengdong.domain.action.BillRepository;
import server.haengdong.domain.action.Member;
import server.haengdong.domain.action.MemberRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.exception.HaengdongException;
import server.haengdong.support.fixture.Fixture;

class BillServiceTest extends ServiceTestSupport {

    @Autowired
    private BillService billService;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private BillDetailRepository billDetailRepository;

    @Autowired
    private MemberRepository memberRepository;

    @DisplayName("전체 지출 내역을 조회한다.")
    @Test
    void findSteps() {
        Event event = Fixture.EVENT1;
        eventRepository.save(event);
        Member member = new Member(event, "토다리");
        memberRepository.save(member);
        Bill bill = Bill.create(event, "행동대장 회식", 100000L, List.of(member));
        billRepository.save(bill);

        List<StepAppResponse> steps = billService.findSteps(event.getToken());

        assertThat(steps.get(0).bills()).hasSize(1)
                .extracting(BillAppResponse::id, BillAppResponse::title, BillAppResponse::price,
                        BillAppResponse::isFixed)
                .containsExactlyInAnyOrder(
                        tuple(bill.getId(), bill.getTitle(), bill.getPrice(), bill.isFixed())
                );

        assertThat(steps.get(0).members()).hasSize(1)
                .extracting(MemberAppResponse::id, MemberAppResponse::name)
                .containsExactlyInAnyOrder(
                        tuple(member.getId(), member.getName())
                );
    }
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

    @DisplayName("지출 내역을 삭제한다.")
    @Test
    void deleteBillAction() {
        Event event = Fixture.EVENT1;
        eventRepository.save(event);
        Member member1 = new Member(event, "토다리");
        Member member2 = new Member(event, "쿠키");
        memberRepository.saveAll(List.of(member1, member2));

        Bill billAction = Bill.create(event, "뽕족", 10000L, List.of(member1, member2));
        billRepository.save(billAction);
        Long billId = billAction.getId();

        billService.deleteBill(event.getToken(), billId);

        assertThat(billRepository.findById(billId)).isEmpty();
    }

    @DisplayName("지출 내역 삭제 시 행사가 존재하지 않으면 예외가 발생한다.")
    @Test
    void deleteBillAction1() {
        assertThatThrownBy(() -> billService.deleteBill("소하망쵸", 1L))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("지출 금액 수정 요청의 총합이 지출 금액과 일치하지 않으면 예외가 발생한다.")
    @Test
    void updateBillDetailsTest1() {
        Event event1 = Fixture.EVENT1;
        eventRepository.save(event1);
        Member member1 = new Member(event1, "토다리");
        Member member2 = new Member(event1, "쿠키");
        memberRepository.saveAll(List.of(member1, member2));

        Bill billAction = Bill.create(event1, "뽕족", 10000L, List.of(member1, member2));
        billRepository.save(billAction);
        List<BillDetail> billDetails = billAction.getBillDetails();

        BillDetailsUpdateAppRequest request = new BillDetailsUpdateAppRequest(List.of(
                new BillDetailUpdateAppRequest(billDetails.get(0).getId(), 3000L, true),
                new BillDetailUpdateAppRequest(billDetails.get(1).getId(), 4000L, true)
        ));

        assertThatThrownBy(
                () -> billService.updateBillDetails(event1.getToken(), billAction.getId(), request))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("지출 총액이 일치하지 않습니다.");
    }

    @DisplayName("지출 고정 금액을 수정한다.")
    @Test
    void updateBillDetailsTest2() {
        Event event1 = Fixture.EVENT1;
        eventRepository.save(event1);
        Member member1 = new Member(event1, "토다리");
        Member member2 = new Member(event1, "쿠키");
        memberRepository.saveAll(List.of(member1, member2));

        Bill bill = Bill.create(event1, "뽕족", 10000L, List.of(member1, member2));
        billRepository.save(bill);
        List<BillDetail> billDetails = bill.getBillDetails();

        BillDetailsUpdateAppRequest request = new BillDetailsUpdateAppRequest(List.of(
                new BillDetailUpdateAppRequest(billDetails.get(0).getId(), 3000L, true),
                new BillDetailUpdateAppRequest(billDetails.get(1).getId(), 7000L, true)
        ));

        billService.updateBillDetails(event1.getToken(), bill.getId(), request);

        List<BillDetail> foundBillDetails = billDetailRepository.findAllByBill(bill);

        assertThat(foundBillDetails).hasSize(2)
                .extracting(BillDetail::getId, BillDetail::getPrice)
                .containsExactly(
                        tuple(billDetails.get(0).getId(), 3000L),
                        tuple(billDetails.get(1).getId(), 7000L)
                );
    }
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
}
