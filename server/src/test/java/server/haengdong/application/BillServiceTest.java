package server.haengdong.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import server.haengdong.application.request.BillAppRequest;
import server.haengdong.application.request.BillDetailUpdateAppRequest;
import server.haengdong.application.request.BillDetailsUpdateAppRequest;
import server.haengdong.application.request.BillUpdateAppRequest;
import server.haengdong.application.response.BillAppResponse;
import server.haengdong.application.response.BillDetailAppResponse;
import server.haengdong.application.response.BillDetailsAppResponse;
import server.haengdong.application.response.MemberAppResponse;
import server.haengdong.application.response.StepAppResponse;
import server.haengdong.domain.bill.Bill;
import server.haengdong.domain.bill.BillDetail;
import server.haengdong.domain.bill.BillDetailRepository;
import server.haengdong.domain.bill.BillRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.domain.member.Member;
import server.haengdong.domain.member.MemberRepository;
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
        Member member1 = new Member(event, "토다리");
        Member member2 = new Member(event, "쿠키");
        Member member3 = new Member(event, "소하");
        Member member4 = new Member(event, "웨디");
        memberRepository.saveAll(List.of(member1, member2, member3, member4));
        Bill bill1 = Bill.create(event, "행동대장 회식1", 100000L, List.of(member1, member2, member3));
        Bill bill2 = Bill.create(event, "행동대장 회식2", 200000L, List.of(member1, member2, member3, member4));
        Bill bill3 = Bill.create(event, "행동대장 회식3", 300000L, List.of(member1, member2, member3, member4));
        Bill bill4 = Bill.create(event, "행동대장 회식4", 400000L, List.of(member2, member3, member4));
        billRepository.saveAll(List.of(bill1, bill2, bill3, bill4));

        List<StepAppResponse> steps = billService.findSteps(event.getToken());

        assertThat(steps).hasSize(3);

        assertThat(steps.get(0).bills()).hasSize(1)
                .extracting(BillAppResponse::id, BillAppResponse::title, BillAppResponse::price,
                        BillAppResponse::isFixed)
                .containsExactlyInAnyOrder(
                        tuple(bill1.getId(), bill1.getTitle(), bill1.getPrice(), bill1.isFixed())
                );

        assertThat(steps.get(0).members()).hasSize(3)
                .extracting(MemberAppResponse::id, MemberAppResponse::name)
                .containsExactlyInAnyOrder(
                        tuple(member1.getId(), member1.getName()),
                        tuple(member2.getId(), member2.getName()),
                        tuple(member3.getId(), member3.getName())
                );

        assertThat(steps.get(1).bills()).hasSize(2)
                .extracting(BillAppResponse::id, BillAppResponse::title, BillAppResponse::price,
                        BillAppResponse::isFixed)
                .containsExactlyInAnyOrder(
                        tuple(bill2.getId(), bill2.getTitle(), bill2.getPrice(), bill2.isFixed()),
                        tuple(bill3.getId(), bill3.getTitle(), bill3.getPrice(), bill3.isFixed())
                );

        assertThat(steps.get(1).members()).hasSize(4)
                .extracting(MemberAppResponse::id, MemberAppResponse::name)
                .containsExactlyInAnyOrder(
                        tuple(member1.getId(), member1.getName()),
                        tuple(member2.getId(), member2.getName()),
                        tuple(member3.getId(), member3.getName()),
                        tuple(member4.getId(), member4.getName())
                );

        assertThat(steps.get(2).bills()).hasSize(1)
                .extracting(BillAppResponse::id, BillAppResponse::title, BillAppResponse::price,
                        BillAppResponse::isFixed)
                .containsExactlyInAnyOrder(
                        tuple(bill4.getId(), bill4.getTitle(), bill4.getPrice(), bill4.isFixed())
                );

        assertThat(steps.get(2).members()).hasSize(3)
                .extracting(MemberAppResponse::id, MemberAppResponse::name)
                .containsExactlyInAnyOrder(
                        tuple(member2.getId(), member2.getName()),
                        tuple(member3.getId(), member3.getName()),
                        tuple(member4.getId(), member4.getName())
                        );
    }

    @DisplayName("지출 내역을 생성한다.")
    @Test
    void saveBill() {
        Event event = Fixture.EVENT1;
        Event savedEvent = eventRepository.save(event);

        Member member1 = Fixture.MEMBER1;
        Member member2 = Fixture.MEMBER2;
        memberRepository.saveAll(List.of(member1, member2));
        List<Long> memberIds = List.of(member1.getId(), member2.getId());
        BillAppRequest billAppRequest = new BillAppRequest("뽕족", 10_000L, memberIds);

        billService.saveBill(event.getToken(), billAppRequest);

        List<Bill> bills = billRepository.findAllByEvent(savedEvent);

        assertThat(bills).extracting(Bill::getTitle, Bill::getPrice)
                .containsExactlyInAnyOrder(
                        tuple("뽕족", 10_000L)
                );
    }

    @DisplayName("지출 내역을 생성하면 지출 상세 내역이 생성된다.")
    @Test
    void saveBillTest1() {
        Event event = Fixture.EVENT1;
        eventRepository.save(event);

        Member member1 = Fixture.MEMBER1;
        Member member2 = Fixture.MEMBER2;
        List<Member> members = List.of(member1, member2);
        memberRepository.saveAll(members);

        BillAppRequest request = new BillAppRequest("뽕족", 10_000L, List.of(member1.getId(), member2.getId()));

        billService.saveBill(event.getToken(), request);

        List<Bill> bills = billRepository.findAllByEvent(event);

        List<BillDetail> billDetails = bills.get(0).getBillDetails();

        assertThat(billDetails)
                .hasSize(2)
                .extracting("member", "price")
                .containsExactlyInAnyOrder(
                        tuple(member1, 5_000L),
                        tuple(member2, 5_000L)
                );
    }

    @DisplayName("토큰에 해당하는 이벤트가 존재하지 않으면 지출 내역을 생성할 수 없다.")
    @Test
    void saveBill1() {
        Event event = Fixture.EVENT1;
        eventRepository.save(event);

        Member member1 = Fixture.MEMBER1;
        Member member2 = Fixture.MEMBER2;
        List<Member> members = List.of(member1, member2);
        memberRepository.saveAll(members);

        BillAppRequest request = new BillAppRequest("뽕족", 10_000L, List.of(member1.getId(), member2.getId()));

        assertThatThrownBy(() -> billService.saveBill("wrongToken", request))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("지출을 수정한다.")
    @Test
    void updateBill() {
        Event event = Fixture.EVENT1;
        eventRepository.save(event);

        Bill bill = new Bill(event, "뽕족", 10_000L);
        Bill savedBill = billRepository.save(bill);

        Long billId = savedBill.getId();
        BillUpdateAppRequest request = new BillUpdateAppRequest("인생맥주", 20_000L);

        billService.updateBill(event.getToken(), billId, request);

        Bill updatedBill = billRepository.findById(savedBill.getId()).get();

        assertAll(
                () -> assertThat(updatedBill.getTitle()).isEqualTo("인생맥주"),
                () -> assertThat(updatedBill.getPrice()).isEqualTo(20_000L)
        );
    }

    @DisplayName("행사에 속하지 않은 지출은 수정할 수 없다.")
    @Test
    void updateBill1() {
        Event event1 = Fixture.EVENT1;
        Event event2 = Fixture.EVENT2;
        eventRepository.saveAll(List.of(event1, event2));
        Bill bill1 = new Bill(event1, "뽕족", 10_000L);
        Bill bill2 = new Bill(event2, "뽕족", 10_000L);
        Bill savedBill1 = billRepository.save(bill1);
        billRepository.save(bill2);

        Long bill1Id = savedBill1.getId();
        BillUpdateAppRequest request = new BillUpdateAppRequest("인생맥주", 20_000L);

        assertThatThrownBy(() -> billService.updateBill(event2.getToken(), bill1Id, request))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("지출 내역 금액을 변경하면 지출 디테일이 초기화 된다.")
    @Test
    void updateBill2() {
        Event event = Fixture.EVENT1;
        eventRepository.save(event);
        Member member1 = new Member(event, "감자");
        Member member2 = new Member(event, "고구마");
        Member member3 = new Member(event, "당근");
        Member member4 = new Member(event, "양파");
        List<Member> members = List.of(member1, member2, member3, member4);
        memberRepository.saveAll(members);
        Bill bill = Bill.create(event, "뽕족", 10_000L, members);
        bill.getBillDetails().forEach(billDetail -> billDetail.updateIsFixed(true));
        billRepository.save(bill);
        BillUpdateAppRequest request = new BillUpdateAppRequest("인생맥주", 20_000L);

        billService.updateBill(event.getToken(), bill.getId(), request);

        Bill updatedBill = billRepository.findAllByEvent(event).get(0);
        List<BillDetail> billDetails = updatedBill.getBillDetails();

        assertThat(billDetails).hasSize(4)
                .extracting(BillDetail::getPrice)
                .containsExactly(5000L, 5000L, 5000L, 5000L);
    }

    @DisplayName("지출 내역을 삭제한다.")
    @Test
    void deleteBill() {
        Event event = Fixture.EVENT1;
        eventRepository.save(event);
        Member member1 = new Member(event, "토다리");
        Member member2 = new Member(event, "쿠키");
        memberRepository.saveAll(List.of(member1, member2));

        Bill bill = Bill.create(event, "뽕족", 10000L, List.of(member1, member2));
        billRepository.save(bill);
        Long billId = bill.getId();

        billService.deleteBill(event.getToken(), billId);

        assertThat(billRepository.findById(billId)).isEmpty();
    }

    @DisplayName("지출 내역 삭제 시 행사가 존재하지 않으면 예외가 발생한다.")
    @Test
    void deleteBill1() {
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

        Bill bill = Bill.create(event1, "뽕족", 10000L, List.of(member1, member2));
        billRepository.save(bill);
        List<BillDetail> billDetails = bill.getBillDetails();

        BillDetailsUpdateAppRequest request = new BillDetailsUpdateAppRequest(List.of(
                new BillDetailUpdateAppRequest(billDetails.get(0).getId(), 3000L, true),
                new BillDetailUpdateAppRequest(billDetails.get(1).getId(), 4000L, true)
        ));

        assertThatThrownBy(
                () -> billService.updateBillDetails(event1.getToken(), bill.getId(), request))
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

        Bill foundBill = billRepository.findAllByEvent(event1).get(0);
        List<BillDetail> foundBillDetails = foundBill.getBillDetails();

        assertThat(foundBillDetails).hasSize(2)
                .extracting(BillDetail::getId, BillDetail::getPrice)
                .containsExactly(
                        tuple(billDetails.get(0).getId(), 3000L),
                        tuple(billDetails.get(1).getId(), 7000L)
                );
    }

    @DisplayName("참여자별 지출 금액을 조회한다.")
    @Test
    void findBillDetailsTest() {
        Event event1 = Fixture.EVENT1;
        eventRepository.save(event1);

        Member member1 = Fixture.MEMBER1;
        Member member2 = Fixture.MEMBER2;
        List<Member> members = List.of(member1, member2);
        memberRepository.saveAll(members);

        Bill bill = Bill.create(event1, "뽕족", 10000L, members);
        billRepository.save(bill);

        BillDetailsAppResponse response = billService.findBillDetails(event1.getToken(), bill.getId());

        assertThat(response.billDetails()).hasSize(2)
                .extracting(BillDetailAppResponse::memberName, BillDetailAppResponse::price)
                .containsExactly(
                        tuple("토다리", 5000L),
                        tuple("쿠키", 5000L)
                );
    }
}
