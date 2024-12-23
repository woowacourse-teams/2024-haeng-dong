package haengdong.presentation;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static haengdong.support.fixture.Fixture.EVENT_MEMBER_1;
import static haengdong.support.fixture.Fixture.EVENT_MEMBER_2;
import static haengdong.support.fixture.Fixture.EVENT_MEMBER_3;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import haengdong.event.application.response.MemberAppResponse;
import haengdong.event.application.response.MemberDepositAppResponse;
import haengdong.event.application.response.MembersDepositAppResponse;
import haengdong.event.domain.event.member.EventMember;

class EventEventMemberControllerTest extends ControllerTestSupport {

    @DisplayName("행사에 참여한 전체 인원을 조회한다.")
    @Test
    void findAllMembersTest() throws Exception {
        EventMember eventMember1 = EVENT_MEMBER_1;
        EventMember eventMember2 = EVENT_MEMBER_2;
        EventMember eventMember3 = EVENT_MEMBER_3;
        List<MemberDepositAppResponse> members = List.of(
                MemberDepositAppResponse.of(eventMember1),
                MemberDepositAppResponse.of(eventMember2),
                MemberDepositAppResponse.of(eventMember3)
        );

        MembersDepositAppResponse memberAppResponse = new MembersDepositAppResponse(members);
        given(eventMemberService.findAllMembers(anyString())).willReturn(memberAppResponse);

        mockMvc.perform(get("/api/events/{eventId}/members", "TOKEN"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.members").isArray())
                .andExpect(jsonPath("$.members[0].id").value(eventMember1.getId()))
                .andExpect(jsonPath("$.members[0].name").value(eventMember1.getName().getValue()))
                .andExpect(jsonPath("$.members[0].isDeposited").value(eventMember1.isDeposited()))
                .andExpect(jsonPath("$.members[1].id").value(eventMember2.getId()))
                .andExpect(jsonPath("$.members[1].name").value(eventMember2.getName().getValue()))
                .andExpect(jsonPath("$.members[1].isDeposited").value(eventMember2.isDeposited()))
                .andExpect(jsonPath("$.members[2].id").value(eventMember3.getId()))
                .andExpect(jsonPath("$.members[2].name").value(eventMember3.getName().getValue()))
                .andExpect(jsonPath("$.members[2].isDeposited").value(eventMember3.isDeposited()));
    }

    @DisplayName("현재 참여 인원을 조회합니다.")
    @Test
    void getCurrentMembers() throws Exception {
        EventMember eventMember1 = EVENT_MEMBER_1;
        EventMember eventMember2 = EVENT_MEMBER_2;
        List<MemberAppResponse> members = List.of(
                MemberAppResponse.of(eventMember1),
                MemberAppResponse.of(eventMember2)
        );

        given(eventMemberService.getCurrentMembers(any())).willReturn(members);

        mockMvc.perform(get("/api/events/{eventId}/members/current", "TOKEN")
                                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.members").isArray())
                .andExpect(jsonPath("$.members[0].id").value(eventMember1.getId()))
                .andExpect(jsonPath("$.members[0].name").value(eventMember1.getName().getValue()))
                .andExpect(jsonPath("$.members[1].id").value(eventMember2.getId()))
                .andExpect(jsonPath("$.members[1].name").value(eventMember2.getName().getValue()));
    }
}
