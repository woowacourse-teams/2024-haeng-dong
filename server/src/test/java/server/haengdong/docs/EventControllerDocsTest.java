package server.haengdong.docs;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.cookies.CookieDocumentation.cookieWithName;
import static org.springframework.restdocs.cookies.CookieDocumentation.responseCookies;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.cookie;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.Duration;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import server.haengdong.application.AuthService;
import server.haengdong.application.EventService;
import server.haengdong.application.request.EventAppRequest;
import server.haengdong.application.response.EventAppResponse;
import server.haengdong.application.response.EventDetailAppResponse;
import server.haengdong.application.response.EventImageAppResponse;
import server.haengdong.application.response.MemberBillReportAppResponse;
import server.haengdong.infrastructure.auth.CookieProperties;
import server.haengdong.presentation.EventController;
import server.haengdong.presentation.request.EventLoginRequest;
import server.haengdong.presentation.request.EventSaveRequest;

class EventControllerDocsTest extends RestDocsSupport {

    private final EventService eventService = mock(EventService.class);
    private final AuthService authService = mock(AuthService.class);
    private final CookieProperties cookieProperties = new CookieProperties(
            true, true, "domain", "path", "none", Duration.ofDays(7)
    );

    @Override
    protected Object initController() {
        return new EventController(eventService, authService, cookieProperties);
    }

    @DisplayName("토큰으로 행사를 조회한다.")
    @Test
    void findEventTest() throws Exception {
        String eventId = "망쵸토큰";
        EventDetailAppResponse eventDetailAppResponse = new EventDetailAppResponse("행동대장 회식", "토스뱅크", "12312455");
        given(eventService.findEvent(eventId)).willReturn(eventDetailAppResponse);

        mockMvc.perform(get("/api/events/{eventId}", eventId))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.eventName").value("행동대장 회식"))
                .andDo(
                        document("getEvent",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID")
                                ),
                                responseFields(
                                        fieldWithPath("eventName").type(JsonFieldType.STRING).description("행사 이름"),
                                        fieldWithPath("bankName").type(JsonFieldType.STRING).description("토스뱅크"),
                                        fieldWithPath("accountNumber").type(JsonFieldType.STRING).description("12312455")
                                )
                        )
                );
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
                .andExpect(MockMvcResultMatchers.jsonPath("$.reports[1].price").value(equalTo(200_000)))
                .andDo(
                        document("getMemberBillReports",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID")
                                ),
                                responseFields(
                                        fieldWithPath("reports").type(JsonFieldType.ARRAY).description("전체 정산 현황 목록"),
                                        fieldWithPath("reports[0].memberId").type(JsonFieldType.NUMBER)
                                                .description("참여자 ID"),
                                        fieldWithPath("reports[0].memberName").type(JsonFieldType.STRING)
                                                .description("참여자 이름"),
                                        fieldWithPath("reports[0].isDeposited").type(JsonFieldType.BOOLEAN)
                                                .description("참여자 이름"),
                                        fieldWithPath("reports[0].price").type(JsonFieldType.NUMBER)
                                                .description("참여자 정산 금액")
                                ))
                );
    }

    @DisplayName("이벤트를 생성한다.")
    @Test
    void saveEvent() throws Exception {
        EventSaveRequest eventSaveRequest = new EventSaveRequest("토다리", "0987");
        String requestBody = objectMapper.writeValueAsString(eventSaveRequest);
        String eventId = "쿠키 토큰";
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
                .andExpect(jsonPath("$.eventId").value("쿠키 토큰"))
                .andDo(
                        document("createEvent",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestFields(
                                        fieldWithPath("eventName").type(JsonFieldType.STRING).description("행사 이름"),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("행사 비밀 번호")
                                ),
                                responseFields(
                                        fieldWithPath("eventId").type(JsonFieldType.STRING)
                                                .description("행사 ID")
                                ),
                                responseCookies(
                                        cookieWithName("eventToken").description("행사 관리자용 토큰")
                                )
                        )
                );
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
                .andExpect(status().isOk())
                .andDo(
                        document("eventLogin",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID")
                                ),
                                requestFields(
                                        fieldWithPath("password").type(JsonFieldType.STRING)
                                                .description("행사 비밀 번호")
                                ),
                                responseCookies(
                                        cookieWithName("eventToken").description("행사 관리자용 토큰")
                                )
                        )
                );
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

        mockMvc.perform(get("/api/events/{eventId}/images", token))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(
                        document("findImages",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID")
                                ),
                                responseFields(
                                        fieldWithPath("images").type(JsonFieldType.ARRAY)
                                                .description("행사 이미지 목록"),
                                        fieldWithPath("images[].id").type(JsonFieldType.NUMBER)
                                                .description("이미지 id"),
                                        fieldWithPath("images[].url").type(JsonFieldType.STRING)
                                                .description("이미지 url")
                                )
                        )
                );
    }
}
