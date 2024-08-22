package server.haengdong.presentation;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import server.haengdong.application.response.MemberBillReportAppResponse;

class ActionControllerTest extends ControllerTestSupport {

    @DisplayName("참여자별 정산 현황을 조회한다.")
    @Test
    void getMemberBillReports() throws Exception {
        List<MemberBillReportAppResponse> memberBillReportAppResponses = List.of(
                new MemberBillReportAppResponse("소하", 20_000L), new MemberBillReportAppResponse("토다리", 200_000L));

        given(actionService.getMemberBillReports(any())).willReturn(memberBillReportAppResponses);

        mockMvc.perform(get("/api/events/{eventId}/actions/reports", "망쵸토큰")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.reports[0].name").value(equalTo("소하")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.reports[0].price").value(equalTo(20_000)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.reports[1].name").value(equalTo("토다리")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.reports[1].price").value(equalTo(200_000)));
    }
}
