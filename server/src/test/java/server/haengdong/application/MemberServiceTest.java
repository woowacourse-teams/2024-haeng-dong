package server.haengdong.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.tuple;
import static server.haengdong.support.fixture.Fixture.MEMBER1;
import static server.haengdong.support.fixture.Fixture.MEMBER2;
import static server.haengdong.support.fixture.Fixture.MEMBER3;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import server.haengdong.application.response.MemberDepositAppResponse;
import server.haengdong.application.response.MembersDepositAppResponse;
import server.haengdong.domain.action.Bill;
import server.haengdong.domain.action.BillRepository;
import server.haengdong.domain.action.Member;
import server.haengdong.domain.action.MemberRepository;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.support.fixture.Fixture;

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
        Event event = Fixture.EVENT1;
        Bill bill = Fixture.BILL1;
        Member member1 = MEMBER1;
        Member member2 = MEMBER2;
        Member member3 = MEMBER3;
        eventRepository.save(event);
        billRepository.save(bill);
        memberRepository.saveAll(List.of(member1, member2, member3));

        MembersDepositAppResponse membersDepositAppResponse = memberService.findAllMembers(event.getToken());

        assertThat(membersDepositAppResponse.members()).hasSize(3)
                .extracting(MemberDepositAppResponse::name, MemberDepositAppResponse::isDeposited)
                .containsExactlyInAnyOrder(
                        tuple(member1.getName(), member1.isDeposited()),
                        tuple(member2.getName(), member2.isDeposited()),
                        tuple(member3.getName(), member3.isDeposited())
                );
    }
}