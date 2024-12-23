package haengdong.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static haengdong.support.fixture.Fixture.BILL1;
import static haengdong.support.fixture.Fixture.EVENT1;
import static haengdong.support.fixture.Fixture.EVENT2;
import static haengdong.support.fixture.Fixture.EVENT_MEMBER_1;
import static haengdong.support.fixture.Fixture.EVENT_MEMBER_2;
import static haengdong.support.fixture.Fixture.EVENT_MEMBER_3;

import haengdong.user.domain.Nickname;
import java.util.List;
import org.assertj.core.groups.Tuple;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import haengdong.event.application.EventMemberService;
import haengdong.event.application.request.MemberSaveAppRequest;
import haengdong.event.application.request.MemberUpdateAppRequest;
import haengdong.event.application.request.MembersSaveAppRequest;
import haengdong.event.application.request.MembersUpdateAppRequest;
import haengdong.event.application.response.MemberAppResponse;
import haengdong.event.application.response.MemberDepositAppResponse;
import haengdong.event.application.response.MemberSaveAppResponse;
import haengdong.event.application.response.MembersDepositAppResponse;
import haengdong.event.application.response.MembersSaveAppResponse;
import haengdong.event.domain.bill.Bill;
import haengdong.event.domain.bill.BillDetail;
import haengdong.event.domain.bill.BillRepository;
import haengdong.event.domain.event.Event;
import haengdong.event.domain.event.EventRepository;
import haengdong.event.domain.event.member.EventMember;
import haengdong.event.domain.event.member.EventMemberRepository;
import haengdong.common.exception.HaengdongException;

class EventEventMemberServiceTest extends ServiceTestSupport {

    @Autowired
    private EventMemberService eventMemberService;

    @Autowired
    private EventMemberRepository eventMemberRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private BillRepository billRepository;

    @DisplayName("행사에 참여자를 추가한다.")
    @Test
    void saveMembersTest() {
        Event event = EVENT1;
        Nickname memberName1 = new Nickname("웨디");
        Nickname memberName2 = new Nickname("쿠키");
        EventMember eventMember1 = new EventMember(event, memberName1);
        EventMember eventMember2 = new EventMember(event, memberName2);
        eventRepository.save(event);
        MembersSaveAppRequest request = new MembersSaveAppRequest(
                List.of(
                        new MemberSaveAppRequest(eventMember1.getName()),
                        new MemberSaveAppRequest(eventMember2.getName())
                )
        );

        MembersSaveAppResponse response = eventMemberService.saveMembers(event.getToken(), request);

        List<EventMember> savedEventMembers = eventMemberRepository.findAll();
        assertAll(
                () -> assertThat(savedEventMembers)
                        .extracting(EventMember::getName)
                        .containsExactlyInAnyOrder(memberName1, memberName2),
                () -> assertThat(response.members())
                        .extracting(MemberSaveAppResponse::id, MemberSaveAppResponse::name)
                        .containsExactlyInAnyOrder(
                                Tuple.tuple(response.members().get(0).id(), memberName1),
                                Tuple.tuple(response.members().get(1).id(), memberName2)
                        )
        );
    }

    @DisplayName("행사에 존재하는 참여자를 추가하는 경우 예외가 발생한다.")
    @Test
    void saveMembersTest1() {
        Event event = EVENT1;
        EventMember eventMember1 = EVENT_MEMBER_1;
        EventMember eventMember2 = EVENT_MEMBER_2;
        eventRepository.save(event);
        eventMemberRepository.save(eventMember1);
        MembersSaveAppRequest request = new MembersSaveAppRequest(
                List.of(
                        new MemberSaveAppRequest(eventMember1.getName()),
                        new MemberSaveAppRequest(eventMember2.getName())
                )
        );

        assertThatThrownBy(() -> eventMemberService.saveMembers(event.getToken(), request))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("현재 참여하고 있는 인원이 존재합니다.");
    }

    @DisplayName("중복된 이름이 존재하는 경우 예외가 발생한다.")
    @Test
    void saveMembersTest2() {
        Event event = EVENT1;
        eventRepository.save(event);
        MembersSaveAppRequest request = new MembersSaveAppRequest(
                List.of(
                        new MemberSaveAppRequest(new Nickname("토다리")),
                        new MemberSaveAppRequest(new Nickname("토다리"))
                )
        );

        assertThatThrownBy(() -> eventMemberService.saveMembers(event.getToken(), request))
                .isInstanceOf(HaengdongException.class)
                .hasMessageContaining("행사에 중복된 참여자 이름이 존재합니다.");
    }

    @DisplayName("행사 참여 인원을 삭제한다.")
    @Test
    void deleteMemberTest() {
        Event event = EVENT1;
        EventMember eventMember = EVENT_MEMBER_1;
        eventRepository.save(event);
        eventMemberRepository.save(eventMember);

        eventMemberService.deleteMember(event.getToken(), eventMember.getId());

        assertThat(eventMemberRepository.findById(eventMember.getId())).isEmpty();
    }

    @DisplayName("다른 이벤트의 참여 인원을 삭제하는 경우 예외가 발생한다.")
    @Test
    void deleteMemberTest1() {
        Event event1 = EVENT1;
        Event event2 = EVENT2;
        EventMember eventMember = new EventMember(EVENT2, new Nickname("감자"));
        eventRepository.saveAll(List.of(event1, event2));
        eventMemberRepository.save(eventMember);

        assertThatThrownBy(() -> eventMemberService.deleteMember(event1.getToken(), eventMember.getId()))
                .isInstanceOf(HaengdongException.class);

        assertThat(eventMemberRepository.findById(eventMember.getId())).isNotEmpty();
    }

    @DisplayName("행사 참여 인원을 삭제하는 경우 해당 참여자가 포함된 Bill이 초기화된다.")
    @Test
    void deleteMemberTest2() {
        Event event1 = EVENT1;
        EventMember eventMember1 = EVENT_MEMBER_1;
        EventMember eventMember2 = EVENT_MEMBER_2;
        List<EventMember> eventMembers = List.of(eventMember1, eventMember2);
        Bill bill = Bill.create(event1, "title", 10000L, eventMembers);
        eventRepository.save(event1);
        eventMemberRepository.saveAll(eventMembers);

        BillDetail billDetail1 = getDetailByMember(bill, eventMember1);
        BillDetail billDetail2 = getDetailByMember(bill, eventMember2);
        billDetail1.updatePrice(8000L);
        billDetail1.updateIsFixed(false);
        billDetail2.updatePrice(2000L);
        billDetail2.updateIsFixed(true);
        billRepository.save(bill);

        eventMemberService.deleteMember(event1.getToken(), eventMember1.getId());
        Bill bill1 = billRepository.findAllByEvent(event1).get(0);
        List<BillDetail> bill1Details = bill1.getBillDetails();

        assertAll(
                () -> assertThat(eventMemberRepository.findById(eventMember1.getId())).isEmpty(),
                () -> assertThat(bill1Details).doesNotContain(billDetail1),
                () -> {
                    BillDetail foundDetail = bill1Details.stream()
                            .filter(billDetail -> billDetail.isSameId(billDetail2.getId())).findFirst().get();
                    assertThat(foundDetail.getPrice()).isEqualTo(10000L);
                    assertThat(foundDetail.isFixed()).isEqualTo(false);
                }
        );
    }

    private BillDetail getDetailByMember(Bill bill, EventMember eventMember) {
        return bill.getBillDetails()
                .stream()
                .filter(billDetail -> billDetail.isMember(eventMember))
                .findFirst()
                .orElseThrow();
    }

    @DisplayName("멤버 이름 정보를 수정한다.")
    @Test
    void updateMembersNameTest() {
        Event event = EVENT1;
        EventMember eventMember = EVENT_MEMBER_1;
        eventRepository.save(event);
        eventMemberRepository.save(eventMember);
        MembersUpdateAppRequest membersUpdateAppRequest = new MembersUpdateAppRequest(
                List.of(
                        new MemberUpdateAppRequest(eventMember.getId(), new Nickname("수정된이름"), true)
                )
        );

        eventMemberService.updateMembers(event.getToken(), membersUpdateAppRequest);

        EventMember updatedEventMember = eventMemberRepository.findById(eventMember.getId()).orElseThrow();
        assertAll(
                () -> assertThat(updatedEventMember.getName().getValue()).isEqualTo("수정된이름"),
                () -> assertTrue(updatedEventMember.isDeposited())
        );
    }

    @DisplayName("멤버 정보를 수정한다.")
    @Test
    void updateMembersIsDepositedTest() {
        Event event = EVENT1;
        EventMember eventMember = EVENT_MEMBER_1;
        eventRepository.save(event);
        eventMemberRepository.save(eventMember);
        MembersUpdateAppRequest membersUpdateAppRequest = new MembersUpdateAppRequest(
                List.of(
                        new MemberUpdateAppRequest(eventMember.getId(), eventMember.getName(), false)
                )
        );

        eventMemberService.updateMembers(event.getToken(), membersUpdateAppRequest);

        EventMember updatedEventMember = eventMemberRepository.findById(eventMember.getId()).orElseThrow();
        assertAll(
                () -> assertThat(updatedEventMember.getName()).isEqualTo(eventMember.getName()),
                () -> assertFalse(updatedEventMember.isDeposited())
        );
    }

    @DisplayName("수정할 멤버 id가 중복된 경우 예외가 발생한다.")
    @Test
    void updateMembersTest2() {
        Event event = EVENT1;
        EventMember eventMember = EVENT_MEMBER_1;
        eventRepository.save(event);
        eventMemberRepository.save(eventMember);
        MembersUpdateAppRequest membersUpdateAppRequest = new MembersUpdateAppRequest(
                List.of(
                        new MemberUpdateAppRequest(eventMember.getId(), new Nickname("수정"), true),
                        new MemberUpdateAppRequest(eventMember.getId(), new Nickname("수정수정"), false)
                )
        );

        assertThatThrownBy(() -> eventMemberService.updateMembers(event.getToken(), membersUpdateAppRequest))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("중복된 참여 인원 이름 변경 요청이 존재합니다.");
    }

    @DisplayName("수정할 멤버 이름이 중복된 경우 예외가 발생한다.")
    @Test
    void updateMembersTest3() {
        Event event = EVENT1;
        EventMember eventMember1 = EVENT_MEMBER_1;
        EventMember eventMember2 = EVENT_MEMBER_2;
        eventRepository.save(event);
        eventMemberRepository.saveAll(List.of(eventMember1, eventMember2));
        MembersUpdateAppRequest membersUpdateAppRequest = new MembersUpdateAppRequest(
                List.of(
                        new MemberUpdateAppRequest(eventMember1.getId(), new Nickname("수정"), true),
                        new MemberUpdateAppRequest(eventMember2.getId(), new Nickname("수정"), false)
                )
        );

        assertThatThrownBy(() -> eventMemberService.updateMembers(event.getToken(), membersUpdateAppRequest))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("중복된 참여 인원 이름 변경 요청이 존재합니다.");
    }

    @DisplayName("수정할 멤버가 행사에 존재하지 않는 경우 예외가 발생한다.")
    @Test
    void updateMembersTest4() {
        Event event1 = EVENT1;
        Event event2 = EVENT2;
        EventMember eventMember = new EventMember(event2, new Nickname("이상"));
        eventRepository.saveAll(List.of(event1, event2));
        eventMemberRepository.save(eventMember);
        MembersUpdateAppRequest membersUpdateAppRequest = new MembersUpdateAppRequest(
                List.of(
                        new MemberUpdateAppRequest(eventMember.getId(), new Nickname("수정"), true)
                )
        );

        assertThatThrownBy(() -> eventMemberService.updateMembers(event1.getToken(), membersUpdateAppRequest))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("업데이트 요청된 참여자 ID 목록과 기존 행사 참여자 ID 목록이 일치하지 않습니다.");
    }

    @DisplayName("수정하려는 행사 참여 인원 이름이 이미 존재하는 경우 예외가 발생한다.")
    @Test
    void updateMembersTest5() {
        Event event1 = EVENT1;
        EventMember eventMember1 = EVENT_MEMBER_1;
        EventMember eventMember2 = EVENT_MEMBER_2;
        eventRepository.save(event1);
        eventMemberRepository.saveAll(List.of(eventMember1, eventMember2));
        MembersUpdateAppRequest membersUpdateAppRequest = new MembersUpdateAppRequest(
                List.of(
                        new MemberUpdateAppRequest(eventMember1.getId(), eventMember2.getName(), true)
                )
        );

        assertThatThrownBy(() -> eventMemberService.updateMembers(event1.getToken(), membersUpdateAppRequest))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("업데이트 요청된 참여자 ID 목록과 기존 행사 참여자 ID 목록이 일치하지 않습니다.");
    }

    @DisplayName("참여자 간 서로의 이름으로 수정하려는 경우 예외가 발생한다.")
    @Test
    void updateMembersTest6() {
        Event event = EVENT1;
        EventMember eventMember1 = EVENT_MEMBER_1;
        EventMember eventMember2 = EVENT_MEMBER_2;
        eventRepository.save(event);
        eventMemberRepository.saveAll(List.of(eventMember1, eventMember2));
        MembersUpdateAppRequest membersUpdateAppRequest = new MembersUpdateAppRequest(
                List.of(
                        new MemberUpdateAppRequest(eventMember1.getId(), eventMember2.getName(), true),
                        new MemberUpdateAppRequest(eventMember2.getId(), eventMember1.getName(), false)
                )
        );

        assertThatThrownBy(() -> eventMemberService.updateMembers(event.getToken(), membersUpdateAppRequest))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("행사에 중복된 참여자 이름이 존재합니다.");
    }

    @DisplayName("행사에 참여한 전체 인원을 조회한다.")
    @Test
    void findAllMembersTest() {
        Event event = EVENT1;
        Bill bill = BILL1;
        EventMember eventMember1 = EVENT_MEMBER_1;
        EventMember eventMember2 = EVENT_MEMBER_2;
        EventMember eventMember3 = EVENT_MEMBER_3;
        eventRepository.save(event);
        eventMemberRepository.saveAll(List.of(eventMember1, eventMember2, eventMember3));
        billRepository.save(bill);

        MembersDepositAppResponse membersDepositAppResponse = eventMemberService.findAllMembers(event.getToken());

        assertThat(membersDepositAppResponse.members()).hasSize(3)
                .extracting(MemberDepositAppResponse::name, MemberDepositAppResponse::isDeposited)
                .containsExactlyInAnyOrder(
                        tuple(eventMember1.getName(), eventMember1.isDeposited()),
                        tuple(eventMember2.getName(), eventMember2.isDeposited()),
                        tuple(eventMember3.getName(), eventMember3.isDeposited())
                );
    }

    @DisplayName("행사에 현재 참여 중인 인원을 조회한다.")
    @Test
    void getCurrentMembersTest() {
        Event event = EVENT1;
        EventMember eventMember1 = EVENT_MEMBER_1;
        EventMember eventMember2 = EVENT_MEMBER_2;
        EventMember eventMember3 = EVENT_MEMBER_3;
        Bill bill1 = Bill.create(event, "title1", 100000L, List.of(eventMember1));
        Bill bill2 = Bill.create(event, "title2", 200000L, List.of(eventMember1, eventMember2, eventMember3));
        Bill bill3 = Bill.create(event, "title2", 200000L, List.of(eventMember1, eventMember2, eventMember3));
        eventRepository.save(event);
        eventMemberRepository.saveAll(List.of(eventMember1, eventMember2, eventMember3));
        billRepository.saveAll(List.of(bill1, bill2, bill3));

        List<MemberAppResponse> currentMembers = eventMemberService.getCurrentMembers(event.getToken());

        assertThat(currentMembers).hasSize(3)
                .extracting(MemberAppResponse::id, MemberAppResponse::name)
                .containsExactlyInAnyOrder(
                        tuple(eventMember1.getId(), eventMember1.getName()),
                        tuple(eventMember2.getId(), eventMember2.getName()),
                        tuple(eventMember3.getId(), eventMember3.getName())
                );
    }

    @DisplayName("행사가 없으면 현재 참여 인원을 조회할 수 없다.")
    @Test
    void getCurrentMembersTest1() {
        assertThatThrownBy(() -> eventMemberService.getCurrentMembers("token"))
                .isInstanceOf(HaengdongException.class);
    }
}
