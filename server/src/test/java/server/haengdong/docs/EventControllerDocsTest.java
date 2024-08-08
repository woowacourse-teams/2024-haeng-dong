package server.haengdong.docs;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.cookies.CookieDocumentation.cookieWithName;
import static org.springframework.restdocs.cookies.CookieDocumentation.requestCookies;
import static org.springframework.restdocs.cookies.CookieDocumentation.responseCookies;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
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
import static server.haengdong.support.fixture.Fixture.EVENT_COOKIE;

import java.time.Duration;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import server.haengdong.application.AuthService;
import server.haengdong.application.EventService;
import server.haengdong.application.request.EventAppRequest;
import server.haengdong.application.response.ActionAppResponse;
import server.haengdong.application.response.ActionAppResponse.ActionType;
import server.haengdong.application.response.EventAppResponse;
import server.haengdong.application.response.EventDetailAppResponse;
import server.haengdong.application.response.MembersAppResponse;
import server.haengdong.infrastructure.auth.CookieProperties;
import server.haengdong.presentation.EventController;
import server.haengdong.presentation.request.EventLoginRequest;
import server.haengdong.presentation.request.EventSaveRequest;
import server.haengdong.presentation.request.MemberNameUpdateRequest;
import server.haengdong.presentation.request.MemberNamesUpdateRequest;

public class EventControllerDocsTest extends RestDocsSupport {

    private final EventService eventService = mock(EventService.class);
    private final AuthService authService = mock(AuthService.class);
    private final CookieProperties cookieProperties = new CookieProperties(
            true, true, "domain", "path", "none", Duration.ofDays(7)
    );

    @Override
    protected Object initController() {
        return new EventController(eventService, authService, cookieProperties);
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

    @DisplayName("토큰으로 행사를 조회한다.")
    @Test
    void findEventTest() throws Exception {
        String eventId = "망쵸토큰";
        EventDetailAppResponse eventDetailAppResponse = new EventDetailAppResponse("행동대장 회식");
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
                                         fieldWithPath("eventName").type(JsonFieldType.STRING).description("행사 이름")
                                 )
                        )
                );
    }

    @DisplayName("행사에 참여한 전체 인원을 중복 없이 조회한다.")
    @Test
    void findAllMembersTest() throws Exception {
        MembersAppResponse memberAppResponse = new MembersAppResponse(List.of("토다리", "쿠키"));
        given(eventService.findAllMembers(anyString())).willReturn(memberAppResponse);

        mockMvc.perform(get("/api/events/{eventId}/members", "TOKEN"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.memberNames").isArray())
                .andExpect(jsonPath("$.memberNames[0]").value("토다리"))
                .andExpect(jsonPath("$.memberNames[1]").value("쿠키"))
                .andDo(
                        document("findAllEventMember",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID")
                                ),
                                responseFields(
                                        fieldWithPath("memberNames").type(JsonFieldType.ARRAY)
                                                .description("행사 참여자 목록")
                                )
                        )
                );
    }

    @DisplayName("행사 참여 인원의 이름을 수정한다.")
    @Test
    void updateMember() throws Exception {
        String token = "TOKEN";
        MemberUpdateRequest memberUpdateRequest = new MemberUpdateRequest("변경된 이름");
        String requestBody = objectMapper.writeValueAsString(memberUpdateRequest);

        mockMvc.perform(put("/api/events/{eventId}/members/{memberName}", token, "변경 전 이름")
                        .cookie(EVENT_COOKIE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(
                        document("updateEventMemberName",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID"),
                                        parameterWithName("memberName").description("참여자 이름")
                                ),
                                requestCookies(
                                        cookieWithName("eventToken").description("행사 관리자 토큰")
                                ),
                                requestFields(
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("수정할 참여자 이름")
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

    @DisplayName("행사 전체 액션 이력 조회")
    @Test
    void findActions() throws Exception {
        String token = "TOKEN";
        List<ActionAppResponse> actionAppResponses = List.of(
                new ActionAppResponse(1L, "망쵸", null, 1L, ActionType.IN),
                new ActionAppResponse(2L, "족발", 100L, 2L, ActionType.BILL),
                new ActionAppResponse(3L, "인생네컷", 1000L, 3L, ActionType.BILL),
                new ActionAppResponse(4L, "망쵸", null, 4L, ActionType.OUT)
        );
        given(eventService.findActions(token)).willReturn(actionAppResponses);

        mockMvc.perform(get("/api/events/{eventId}/actions", token)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.steps[0].type").value(equalTo("IN")))
                .andExpect(jsonPath("$.steps[0].members[0]").value(equalTo("망쵸")))
                .andExpect(jsonPath("$.steps[0].actions[0].actionId").value(equalTo(1)))
                .andExpect(jsonPath("$.steps[0].actions[0].name").value(equalTo("망쵸")))
                .andExpect(jsonPath("$.steps[0].actions[0].price").value(equalTo(null)))
                .andExpect(jsonPath("$.steps[0].actions[0].sequence").value(equalTo(1)))

                .andExpect(jsonPath("$.steps[1].type").value(equalTo("BILL")))
                .andExpect(jsonPath("$.steps[1].members[0]").value(equalTo("망쵸")))
                .andExpect(jsonPath("$.steps[1].actions[0].actionId").value(equalTo(2)))
                .andExpect(jsonPath("$.steps[1].actions[0].name").value(equalTo("족발")))
                .andExpect(jsonPath("$.steps[1].actions[0].price").value(equalTo(100)))
                .andExpect(jsonPath("$.steps[1].actions[0].sequence").value(equalTo(2)))

                .andExpect(jsonPath("$.steps[1].actions[1].actionId").value(equalTo(3)))
                .andExpect(jsonPath("$.steps[1].actions[1].name").value(equalTo("인생네컷")))
                .andExpect(jsonPath("$.steps[1].actions[1].price").value(equalTo(1000)))
                .andExpect(jsonPath("$.steps[1].actions[1].sequence").value(equalTo(3)))

                .andExpect(jsonPath("$.steps[2].type").value(equalTo("OUT")))
                .andExpect(jsonPath("$.steps[2].actions[0].actionId").value(equalTo(4)))
                .andExpect(jsonPath("$.steps[2].actions[0].name").value(equalTo("망쵸")))
                .andExpect(jsonPath("$.steps[2].actions[0].price").value(equalTo(null)))
                .andExpect(jsonPath("$.steps[2].actions[0].sequence").value(equalTo(4)))

                .andDo(
                        document("findActions",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID")
                                ),
                                responseFields(
                                        fieldWithPath("steps[].type").type(JsonFieldType.STRING)
                                                .description("액션 유형 [BILL, IN, OUT]"),
                                        fieldWithPath("steps[].members").type(JsonFieldType.ARRAY)
                                                .description("해당 step에 참여한 참여자 목록"),
                                        fieldWithPath("steps[].actions[].actionId").type(JsonFieldType.NUMBER)
                                                .description("액션 ID"),
                                        fieldWithPath("steps[].actions[].name").type(JsonFieldType.STRING)
                                                .description("참여자 액션일 경우 참여자 이름, 지출 액션일 경우 지출 내역 이름"),
                                        fieldWithPath("steps[].actions[].price").type(JsonFieldType.NUMBER).optional()
                                                .description("참여자 액션일 경우 null, 지출 액션일 경우 지출 금액"),
                                        fieldWithPath("steps[].actions[].sequence").type(JsonFieldType.NUMBER)
                                                .description("액션 순서")
                                )
                        )
                );
    }
}
