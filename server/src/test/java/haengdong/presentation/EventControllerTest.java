package haengdong.presentation;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.cookie;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import haengdong.event.application.request.EventGuestAppRequest;
import haengdong.event.application.response.EventAppResponse;
import haengdong.event.application.response.EventDetailAppResponse;
import haengdong.event.application.response.EventImageAppResponse;
import haengdong.event.application.response.MemberBillReportAppResponse;
import haengdong.event.presentation.request.EventGuestSaveRequest;
import haengdong.user.domain.AccountNumber;
import haengdong.user.domain.Bank;
import haengdong.user.domain.Nickname;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


class EventControllerTest extends ControllerTestSupport {

    @DisplayName("토큰으로 행사를 조회한다.")
    @Test
    void findEventTest() throws Exception {
        String eventId = "망쵸토큰";
        EventDetailAppResponse eventDetailAppResponse = new EventDetailAppResponse("행동대장 회식", Bank.of("토스뱅크"), new AccountNumber("12312455"), true);
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
                new MemberBillReportAppResponse(1L, new Nickname("소하"), false, 20_000L),
                new MemberBillReportAppResponse(2L, new Nickname("토다리"), false, 200_000L)
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
    void saveEventGuest() throws Exception {
        EventGuestSaveRequest eventSaveRequest = new EventGuestSaveRequest("토다리", "nick", "0987");
        String requestBody = objectMapper.writeValueAsString(eventSaveRequest);
        String eventId = "망쵸토큰";
        EventAppResponse eventAppResponse = new EventAppResponse(eventId, 1L);
        given(eventService.saveEventGuest(any(EventGuestAppRequest.class))).willReturn(eventAppResponse);
        given(authService.createGuestToken(1L)).willReturn("jwtToken");
        given(authService.getTokenName()).willReturn("accessToken");

        mockMvc.perform(post("/api/events/guest")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(cookie().value("accessToken", "jwtToken"))
                .andExpect(jsonPath("$.eventId").value("망쵸토큰"));
    }

    @DisplayName("행사 이미지를 조회한다.")
    @Test
    void findAllImages() throws Exception {
        String token = "TOKEN";
        List<EventImageAppResponse> imageNameAppResponses = List.of(
                new EventImageAppResponse(1L, "https://host.com/image1.jpg"),
                new EventImageAppResponse(2L, "https://host.com/image2.jpg"),
                new EventImageAppResponse(3L, "https://host.com/zeze.jpg")
        );
        given(eventService.findImages(token)).willReturn(imageNameAppResponses);

        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/events/{eventId}/images", token))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
