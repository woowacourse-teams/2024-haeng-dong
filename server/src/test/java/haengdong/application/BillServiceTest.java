package haengdong.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;
import static org.junit.jupiter.api.Assertions.assertAll;

import haengdong.common.exception.HaengdongException;
import haengdong.event.application.BillService;
import haengdong.event.application.request.BillAppRequest;
import haengdong.event.application.request.BillDetailUpdateAppRequest;
import haengdong.event.application.request.BillDetailsUpdateAppRequest;
import haengdong.event.application.request.BillUpdateAppRequest;
import haengdong.event.application.response.BillAppResponse;
import haengdong.event.application.response.BillDetailAppResponse;
import haengdong.event.application.response.BillDetailsAppResponse;
import haengdong.event.application.response.MemberAppResponse;
import haengdong.event.application.response.StepAppResponse;
import haengdong.event.domain.bill.Bill;
import haengdong.event.domain.bill.BillDetail;
import haengdong.event.domain.bill.BillRepository;
import haengdong.event.domain.event.Event;
import haengdong.event.domain.event.EventRepository;
import haengdong.event.domain.event.member.EventMember;
import haengdong.event.domain.event.member.EventMemberRepository;
import haengdong.support.fixture.Fixture;
import haengdong.user.domain.Nickname;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class BillServiceTest extends ServiceTestSupport {

    @Autowired
    private BillService billService;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private EventMemberRepository eventMemberRepository;

    @DisplayName("전체 지출 내역을 조회한다.")
    @Test
    void findSteps() {
        Event event = Fixture.EVENT1;
        eventRepository.save(event);
        EventMember eventMember1 = new EventMember(event, "토다리");
        EventMember eventMember2 = new EventMember(event, "쿠키");
        EventMember eventMember3 = new EventMember(event, "소하");
        EventMember eventMember4 = new EventMember(event, "웨디");
        eventMemberRepository.saveAll(List.of(eventMember1, eventMember2, eventMember3, eventMember4));
        Bill bill1 = Bill.create(event, "행동대장 회식1", 100000L, List.of(eventMember1, eventMember2, eventMember3));
        Bill bill2 = Bill.create(event, "행동대장 회식2", 200000L, List.of(
                eventMember1, eventMember2, eventMember3, eventMember4));
        Bill bill3 = Bill.create(event, "행동대장 회식3", 300000L, List.of(
                eventMember1, eventMember2, eventMember3, eventMember4));
        Bill bill4 = Bill.create(event, "행동대장 회식4", 400000L, List.of(eventMember2, eventMember3, eventMember4));
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
                        tuple(eventMember1.getId(), eventMember1.getName()),
                        tuple(eventMember2.getId(), eventMember2.getName()),
                        tuple(eventMember3.getId(), eventMember3.getName())
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
                        tuple(eventMember1.getId(), eventMember1.getName()),
                        tuple(eventMember2.getId(), eventMember2.getName()),
                        tuple(eventMember3.getId(), eventMember3.getName()),
                        tuple(eventMember4.getId(), eventMember4.getName())
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
                        tuple(eventMember2.getId(), eventMember2.getName()),
                        tuple(eventMember3.getId(), eventMember3.getName()),
                        tuple(eventMember4.getId(), eventMember4.getName())
                        );
    }

    @DisplayName("지출 내역을 생성한다.")
    @Test
    void saveBill() {
        Event event = Fixture.EVENT1;
        Event savedEvent = eventRepository.save(event);

        EventMember eventMember1 = Fixture.EVENT_MEMBER_1;
        EventMember eventMember2 = Fixture.EVENT_MEMBER_2;
        eventMemberRepository.saveAll(List.of(eventMember1, eventMember2));
        List<Long> memberIds = List.of(eventMember1.getId(), eventMember2.getId());
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

        EventMember eventMember1 = Fixture.EVENT_MEMBER_1;
        EventMember eventMember2 = Fixture.EVENT_MEMBER_2;
        List<EventMember> eventMembers = List.of(eventMember1, eventMember2);
        eventMemberRepository.saveAll(eventMembers);

        BillAppRequest request = new BillAppRequest("뽕족", 10_000L, List.of(eventMember1.getId(), eventMember2.getId()));

        billService.saveBill(event.getToken(), request);

        List<Bill> bills = billRepository.findAllByEvent(event);

        List<BillDetail> billDetails = bills.get(0).getBillDetails();

        assertThat(billDetails)
                .hasSize(2)
                .extracting("eventMember", "price")
                .containsExactlyInAnyOrder(
                        tuple(eventMember1, 5_000L),
                        tuple(eventMember2, 5_000L)
                );
    }

    @DisplayName("토큰에 해당하는 이벤트가 존재하지 않으면 지출 내역을 생성할 수 없다.")
    @Test
    void saveBill1() {
        Event event = Fixture.EVENT1;
        eventRepository.save(event);

        EventMember eventMember1 = Fixture.EVENT_MEMBER_1;
        EventMember eventMember2 = Fixture.EVENT_MEMBER_2;
        List<EventMember> eventMembers = List.of(eventMember1, eventMember2);
        eventMemberRepository.saveAll(eventMembers);

        BillAppRequest request = new BillAppRequest("뽕족", 10_000L, List.of(eventMember1.getId(), eventMember2.getId()));

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
        EventMember eventMember1 = new EventMember(event, "감자");
        EventMember eventMember2 = new EventMember(event, "고구마");
        EventMember eventMember3 = new EventMember(event, "당근");
        EventMember eventMember4 = new EventMember(event, "양파");
        List<EventMember> eventMembers = List.of(eventMember1, eventMember2, eventMember3, eventMember4);
        eventMemberRepository.saveAll(eventMembers);
        Bill bill = Bill.create(event, "뽕족", 10_000L, eventMembers);
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
        EventMember eventMember1 = new EventMember(event, "토다리");
        EventMember eventMember2 = new EventMember(event, "쿠키");
        eventMemberRepository.saveAll(List.of(eventMember1, eventMember2));

        Bill bill = Bill.create(event, "뽕족", 10000L, List.of(eventMember1, eventMember2));
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
        EventMember eventMember1 = new EventMember(event1, "토다리");
        EventMember eventMember2 = new EventMember(event1, "쿠키");
        eventMemberRepository.saveAll(List.of(eventMember1, eventMember2));

        Bill bill = Bill.create(event1, "뽕족", 10000L, List.of(eventMember1, eventMember2));
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
        EventMember eventMember1 = new EventMember(event1, "토다리");
        EventMember eventMember2 = new EventMember(event1, "쿠키");
        eventMemberRepository.saveAll(List.of(eventMember1, eventMember2));

        Bill bill = Bill.create(event1, "뽕족", 10000L, List.of(eventMember1, eventMember2));
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
                        tuple(3L, 3000L),
                        tuple(4L, 7000L)
                );
    }

    @DisplayName("참여자별 지출 금액을 조회한다.")
    @Test
    void findBillDetailsTest() {
        Event event1 = Fixture.EVENT1;
        eventRepository.save(event1);

        EventMember eventMember1 = Fixture.EVENT_MEMBER_1;
        EventMember eventMember2 = Fixture.EVENT_MEMBER_2;
        List<EventMember> eventMembers = List.of(eventMember1, eventMember2);
        eventMemberRepository.saveAll(eventMembers);

        Bill bill = Bill.create(event1, "뽕족", 10000L, eventMembers);
        billRepository.save(bill);

        BillDetailsAppResponse response = billService.findBillDetails(event1.getToken(), bill.getId());

        assertThat(response.billDetails()).hasSize(2)
                .extracting(BillDetailAppResponse::memberName, BillDetailAppResponse::price)
                .containsExactly(
                        tuple(new Nickname("토다리"), 5000L),
                        tuple(new Nickname("쿠키"), 5000L)
                );
    }
}
