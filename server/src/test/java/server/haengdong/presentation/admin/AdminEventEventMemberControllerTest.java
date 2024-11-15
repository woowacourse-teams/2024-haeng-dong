package server.haengdong.presentation.admin;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static server.haengdong.support.fixture.Fixture.EVENT_COOKIE;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import server.haengdong.application.response.MemberSaveAppResponse;
import server.haengdong.application.response.MembersSaveAppResponse;
import server.haengdong.presentation.ControllerTestSupport;
import server.haengdong.presentation.request.MemberSaveRequest;
import server.haengdong.presentation.request.MemberUpdateRequest;
import server.haengdong.presentation.request.MembersSaveRequest;
import server.haengdong.presentation.request.MembersUpdateRequest;

class AdminEventEventMemberControllerTest extends ControllerTestSupport {

    @DisplayName("행사 참여자를 추가한다.")
    @Test
    void saveMemberTest() throws Exception {
        String eventToken = "망쵸토큰";
        MembersSaveRequest membersSaveRequest = new MembersSaveRequest(
                List.of(
                        new MemberSaveRequest("웨디"),
                        new MemberSaveRequest("소하")
                )
        );
        String requestBody = objectMapper.writeValueAsString(membersSaveRequest);
        MembersSaveAppResponse appResponse = new MembersSaveAppResponse(
                List.of(
                        new MemberSaveAppResponse(1L, "웨디"),
                        new MemberSaveAppResponse(2L, "소하")
                )
        );
        given(eventMemberService.saveMembers(eventToken, membersSaveRequest.toAppRequest()))
                .willReturn(appResponse);

        mockMvc.perform(post("/api/admin/events/{eventId}/members", "망쵸토큰")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody)
                        .cookie(EVENT_COOKIE))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.members[0].id").value(equalTo(1)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.members[0].name").value(equalTo("웨디")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.members[1].id").value(equalTo(2)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.members[1].name").value(equalTo("소하")));
    }

    @DisplayName("행사 참여 인원을 삭제한다.")
    @Test
    void deleteMember() throws Exception {
        String eventId = "망쵸토큰";
        Long memberId = 1L;

        mockMvc.perform(delete("/api/admin/events/{eventId}/members/{memberId}", eventId, memberId))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @DisplayName("행사 참여 인원 정보를 수정한다.")
    @Test
    void updateMembers() throws Exception {
        String eventId = "망쵸토큰";
        MembersUpdateRequest membersUpdateRequest = new MembersUpdateRequest(
                List.of(
                        new MemberUpdateRequest(1L, "토다리", true),
                        new MemberUpdateRequest(2L, "쿠키", false)
                )
        );
        String requestBody = objectMapper.writeValueAsString(membersUpdateRequest);

        mockMvc.perform(put("/api/admin/events/{eventId}/members", eventId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody)
                        .cookie(EVENT_COOKIE)
                )
                .andDo(print())
                .andExpect(status().isOk());
    }
}
