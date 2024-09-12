//package server.haengdong.presentation;
//
//import static org.hamcrest.Matchers.equalTo;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.BDDMockito.given;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//import java.util.List;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.http.MediaType;
//import server.haengdong.application.response.LastBillMemberAppResponse;
//
//class MemberActionControllerTest extends ControllerTestSupport {
//
//    @DisplayName("현재 참여 인원을 조회합니다.")
//    @Test
//    void getCurrentMembers() throws Exception {
//        List<LastBillMemberAppResponse> lastBillMemberAppRespons = List.of(
//                new LastBillMemberAppResponse("소하"), new LastBillMemberAppResponse("토다리"));
//
//        given(memberActionService.getCurrentMembers(any())).willReturn(lastBillMemberAppRespons);
//
//        mockMvc.perform(get("/api/events/{eventId}/members/current", "망쵸토큰")
//                        .accept(MediaType.APPLICATION_JSON))
//                .andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.memberNames[0]").value(equalTo("소하")))
//                .andExpect(jsonPath("$.memberNames[1]").value(equalTo("토다리")));
//    }
//}
