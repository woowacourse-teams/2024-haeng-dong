package server.haengdong.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;
import static server.haengdong.support.fixture.Fixture.BILL1;
import static server.haengdong.support.fixture.Fixture.EVENT1;
import static server.haengdong.support.fixture.Fixture.MEMBER1;
import static server.haengdong.support.fixture.Fixture.MEMBER2;
import static server.haengdong.support.fixture.Fixture.MEMBER3;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import server.haengdong.application.response.MemberAppResponse;
import server.haengdong.application.response.MemberDepositAppResponse;
import server.haengdong.application.response.MembersDepositAppResponse;
import server.haengdong.domain.action.Bill;
import server.haengdong.domain.action.BillDetail;
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
