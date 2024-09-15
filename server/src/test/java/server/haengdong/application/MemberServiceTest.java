package server.haengdong.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;
import static org.junit.jupiter.api.Assertions.assertAll;
import static server.haengdong.support.fixture.Fixture.BILL1;
import static server.haengdong.support.fixture.Fixture.EVENT1;
import static server.haengdong.support.fixture.Fixture.EVENT2;
import static server.haengdong.support.fixture.Fixture.MEMBER1;
import static server.haengdong.support.fixture.Fixture.MEMBER2;
import static server.haengdong.support.fixture.Fixture.MEMBER3;

import java.util.List;
import org.assertj.core.groups.Tuple;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import server.haengdong.application.request.MemberSaveAppRequest;
import server.haengdong.application.request.MembersSaveAppRequest;
import server.haengdong.application.response.MemberAppResponse;
import server.haengdong.application.response.MemberDepositAppResponse;
import server.haengdong.application.response.MemberSaveAppResponse;
import server.haengdong.application.response.MembersDepositAppResponse;
import server.haengdong.application.response.MembersSaveAppResponse;
import server.haengdong.domain.action.Bill;
import server.haengdong.domain.action.BillDetail;
import server.haengdong.domain.action.BillDetailRepository;
import server.haengdong.domain.action.BillRepository;
import server.haengdong.domain.action.Member;
import server.haengdong.domain.action.MemberRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.exception.HaengdongException;

class MemberServiceTest extends ServiceTestSupport {

    @Autowired
    private MemberService memberService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private BillDetailRepository billDetailRepository;

    @DisplayName("행사에 참여자를 추가한다.")
    @Test
    void saveMembersTest() {
        Event event = EVENT1;
        Member member1 = MEMBER1;
        Member member2 = MEMBER2;
        eventRepository.save(event);
        MembersSaveAppRequest request = new MembersSaveAppRequest(
                List.of(
                        new MemberSaveAppRequest(member1.getName()),
                        new MemberSaveAppRequest(member2.getName())
                )
        );

        MembersSaveAppResponse response = memberService.saveMembers(event.getToken(), request);

        Member savedMember1 = memberRepository.findByEventAndName(event, member1.getName()).get();
        Member savedMember2 = memberRepository.findByEventAndName(event, member2.getName()).get();
        assertThat(response.members())
                .extracting(MemberSaveAppResponse::id, MemberSaveAppResponse::name)
                .containsExactlyInAnyOrder(
                        Tuple.tuple(savedMember1.getId(), savedMember1.getName()),
                        Tuple.tuple(savedMember2.getId(), savedMember2.getName())
                );
    }

    @DisplayName("행사에 존재하는 참여자를 추가하는 경우 예외가 발생한다.")
    @Test
    void saveMembersTest1() {
        Event event = EVENT1;
        Member member1 = MEMBER1;
        Member member2 = MEMBER2;
        eventRepository.save(event);
        memberRepository.save(member1);
        MembersSaveAppRequest request = new MembersSaveAppRequest(
                List.of(
                        new MemberSaveAppRequest(member1.getName()),
                        new MemberSaveAppRequest(member2.getName())
                )
        );

        assertThatThrownBy(() -> memberService.saveMembers(event.getToken(), request))
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
                        new MemberSaveAppRequest("토다리"),
                        new MemberSaveAppRequest("토다리")
                )
        );

        assertThatThrownBy(() -> memberService.saveMembers(event.getToken(), request))
                .isInstanceOf(HaengdongException.class)
                .hasMessageContaining("중복된 이름이 존재합니다. 입력된 이름: [토다리, 토다리]");
    }

    @DisplayName("행사 참여 인원을 삭제한다.")
    @Test
    void deleteMemberTest() {
        Event event = EVENT1;
        Member member = MEMBER1;
        eventRepository.save(event);
        memberRepository.save(member);

        memberService.deleteMember(event.getToken(), member.getId());

        assertThat(memberRepository.findById(member.getId())).isEmpty();
    }

    @DisplayName("존재하지 않는 행사 참여 인원일 경우 삭제하지 않는다.")
    @Test
    void deleteMemberTest1() {
        Event event1 = EVENT1;
        Event event2 = EVENT2;
        Member member = new Member(EVENT2, "감자");
        eventRepository.saveAll(List.of(event1, event2));
        memberRepository.save(member);

        memberService.deleteMember(event1.getToken(), member.getId());

        assertThat(memberRepository.findById(member.getId())).isNotEmpty();
    }

    @DisplayName("행사 참여 인원을 삭제하는 경우 해당 참여자가 포함된 Bill이 초기화된다.")
    @Test
    void deleteMemberTest2() {
        Event event1 = EVENT1;
        Member member1 = MEMBER1;
        Member member2 = MEMBER2;
        Bill bill = BILL1;

        BillDetail billDetail1 = new BillDetail(bill, member1, 8000L, false);
        BillDetail billDetail2 = new BillDetail(bill, member2, 2000L, true);
        bill.addDetail(billDetail1);
        bill.addDetail(billDetail2);
        eventRepository.save(event1);
        memberRepository.saveAll(List.of(member1, member2));
        billRepository.save(bill);

        memberService.deleteMember(event1.getToken(), member1.getId());

        assertAll(
                () -> assertThat(memberRepository.findById(member1.getId())).isEmpty(),
                () -> assertThat(billDetailRepository.findById(billDetail1.getId())).isEmpty(),
                () -> {
                    BillDetail foundDetail = billDetailRepository.findById(billDetail2.getId()).orElseThrow();
                    assertThat(foundDetail.getPrice()).isEqualTo(10000L);
                    assertThat(foundDetail.isFixed()).isEqualTo(false);
                }
        );
    }

    @DisplayName("행사에 참여한 전체 인원을 조회한다.")
    @Test
    void findAllMembersTest() {
        Event event = EVENT1;
        Bill bill = BILL1;
        Member member1 = MEMBER1;
        Member member2 = MEMBER2;
        Member member3 = MEMBER3;
        eventRepository.save(event);
        memberRepository.saveAll(List.of(member1, member2, member3));
        billRepository.save(bill);

        MembersDepositAppResponse membersDepositAppResponse = memberService.findAllMembers(event.getToken());

        assertThat(membersDepositAppResponse.members()).hasSize(3)
                .extracting(MemberDepositAppResponse::name, MemberDepositAppResponse::isDeposited)
                .containsExactlyInAnyOrder(
                        tuple(member1.getName(), member1.isDeposited()),
                        tuple(member2.getName(), member2.isDeposited()),
                        tuple(member3.getName(), member3.isDeposited())
                );
    }

    @DisplayName("행사에 현재 참여 중인 인원을 조회한다.")
    @Test
    void getCurrentMembersTest() {
        Event event = EVENT1;
        Bill bill = BILL1;
        Member member1 = MEMBER1;
        Member member2 = MEMBER2;
        Member member3 = MEMBER3;
        bill.addDetail(new BillDetail(bill, member1, 10000L, false));
        bill.addDetail(new BillDetail(bill, member2, 20000L, false));
        bill.addDetail(new BillDetail(bill, member3, 30000L, false));
        eventRepository.save(event);
        memberRepository.saveAll(List.of(member1, member2, member3));
        billRepository.save(bill);

        List<MemberAppResponse> currentMembers = memberService.getCurrentMembers(event.getToken());

        assertThat(currentMembers).hasSize(3)
                .extracting(MemberAppResponse::id, MemberAppResponse::name)
                .containsExactlyInAnyOrder(
                        tuple(member1.getId(), member1.getName()),
                        tuple(member2.getId(), member2.getName()),
                        tuple(member3.getId(), member3.getName())
                );
    }

    @DisplayName("행사가 없으면 현재 참여 인원을 조회할 수 없다.")
    @Test
    void getCurrentMembersTest1() {
        assertThatThrownBy(() -> memberService.getCurrentMembers("token"))
                .isInstanceOf(HaengdongException.class);
    }
}
