package server.haengdong.presentation;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static server.haengdong.support.fixture.Fixture.MEMBER1;
import static server.haengdong.support.fixture.Fixture.MEMBER2;
import static server.haengdong.support.fixture.Fixture.MEMBER3;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import server.haengdong.application.response.MemberDepositAppResponse;
import server.haengdong.application.response.MembersDepositAppResponse;
import server.haengdong.domain.action.Member;

class MemberControllerTest extends ControllerTestSupport {

    @DisplayName("행사에 참여한 전체 인원을 조회한다.")
    @Test
    void findAllMembersTest() throws Exception {
        Member member1 = MEMBER1;
        Member member2 = MEMBER2;
        Member member3 = MEMBER3;
        List<MemberDepositAppResponse> members = List.of(
                MemberDepositAppResponse.of(member1),
                MemberDepositAppResponse.of(member2),
                MemberDepositAppResponse.of(member3)
        );

        MembersDepositAppResponse memberAppResponse = new MembersDepositAppResponse(members);
        given(memberService.findAllMembers(anyString())).willReturn(memberAppResponse);

        mockMvc.perform(get("/api/events/{eventId}/members", "TOKEN"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.members").isArray())
                .andExpect(jsonPath("$.members[0].id").value(member1.getId()))
                .andExpect(jsonPath("$.members[0].name").value(member1.getName()))
                .andExpect(jsonPath("$.members[0].isDeposited").value(member1.isDeposited()))
                .andExpect(jsonPath("$.members[1].id").value(member2.getId()))
                .andExpect(jsonPath("$.members[1].name").value(member2.getName()))
                .andExpect(jsonPath("$.members[1].isDeposited").value(member2.isDeposited()))
                .andExpect(jsonPath("$.members[2].id").value(member3.getId()))
                .andExpect(jsonPath("$.members[2].name").value(member3.getName()))
                .andExpect(jsonPath("$.members[2].isDeposited").value(member3.isDeposited()));
    }
}
