package server.haengdong.presentation;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.cookie;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import server.haengdong.application.request.EventAppRequest;
import server.haengdong.application.response.EventAppResponse;
import server.haengdong.application.response.EventDetailAppResponse;
import server.haengdong.application.response.MemberBillReportAppResponse;
import server.haengdong.presentation.request.EventLoginRequest;
import server.haengdong.presentation.request.EventSaveRequest;


class EventControllerTest extends ControllerTestSupport {

    @DisplayName("토큰으로 행사를 조회한다.")
    @Test
    void findEventTest() throws Exception {
        String eventId = "망쵸토큰";
        EventDetailAppResponse eventDetailAppResponse = new EventDetailAppResponse("행동대장 회식", "토스뱅크", "1231245");
        given(eventService.findEvent(eventId)).willReturn(eventDetailAppResponse);

        mockMvc.perform(get("/api/events/{eventId}", eventId))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.eventName").value("행동대장 회식"));
    }

    @DisplayName("참여자별 정산 현황을 조회한다.")
    @Test
    void getMemberBillReports() throws Exception {
        List<MemberBillReportAppResponse> memberBillReportAppResponses = List.of(
                new MemberBillReportAppResponse(1L, "소하", false, 20_000L),
                new MemberBillReportAppResponse(2L, "토다리", false, 200_000L)
        );

        given(eventService.getMemberBillReports(any())).willReturn(memberBillReportAppResponses);

        mockMvc.perform(get("/api/events/{eventId}/reports", "망쵸토큰")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.reports[0].memberId").value(equalTo(1)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.reports[0].memberName").value(equalTo("소하")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.reports[0].isDeposited").value(equalTo(false)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.reports[0].price").value(equalTo(20_000)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.reports[1].memberId").value(equalTo(2)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.reports[1].memberName").value(equalTo("토다리")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.reports[1].isDeposited").value(equalTo(false)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.reports[1].price").value(equalTo(200_000)));
    }

    @DisplayName("이벤트를 생성한다.")
    @Test
    void saveEvent() throws Exception {
        EventSaveRequest eventSaveRequest = new EventSaveRequest("토다리", "0987");
        String requestBody = objectMapper.writeValueAsString(eventSaveRequest);
        String eventId = "망쵸토큰";
        EventAppResponse eventAppResponse = new EventAppResponse(eventId);
        given(eventService.saveEvent(any(EventAppRequest.class))).willReturn(eventAppResponse);
        given(authService.createToken(eventId)).willReturn("jwtToken");
        given(authService.getTokenName()).willReturn("eventToken");

        mockMvc.perform(post("/api/events")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(cookie().value("eventToken", "jwtToken"))
                .andExpect(jsonPath("$.eventId").value("망쵸토큰"));
    }

    @DisplayName("행사 어드민이 로그인한다.")
    @Test
    void loginEvent() throws Exception {
        String token = "TOKEN";
        EventLoginRequest eventLoginRequest = new EventLoginRequest("1234");
        String requestBody = objectMapper.writeValueAsString(eventLoginRequest);
        given(authService.createToken(token)).willReturn("jwtToken");
        given(authService.getTokenName()).willReturn("eventToken");

        mockMvc.perform(post("/api/events/{eventId}/login", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andDo(print())
                .andExpect(cookie().value("eventToken", "jwtToken"))
                .andExpect(status().isOk());
    }
}
