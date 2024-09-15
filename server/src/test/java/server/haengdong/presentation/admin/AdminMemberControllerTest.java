package server.haengdong.presentation.admin;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static server.haengdong.support.fixture.Fixture.EVENT_COOKIE;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import server.haengdong.application.response.MemberSaveAppResponse;
import server.haengdong.application.response.MembersSaveAppResponse;
import server.haengdong.presentation.ControllerTestSupport;
import server.haengdong.presentation.request.MemberSaveRequest;
import server.haengdong.presentation.request.MembersSaveRequest;

class AdminMemberControllerTest extends ControllerTestSupport {

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
        given(memberService.saveMembers(eventToken, membersSaveRequest.toAppRequest()))
                .willReturn(appResponse);

        mockMvc.perform(RestDocumentationRequestBuilders.post("/api/admin/events/{eventId}/members", "망쵸토큰")
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

//    @DisplayName("행사의 전체 참여자 중에서 특정 참여자의 맴버 액션을 전부 삭제한다.")
//    @Test
//    void deleteMember() throws Exception {
//        String eventId = "망쵸토큰";
//        String memberName = "행동대장";
//
//        mockMvc.perform(delete("/api/admin/events/{eventId}/members/{memberName}", eventId, memberName))
//                .andDo(print())
//                .andExpect(status().isOk());
//    }
}
