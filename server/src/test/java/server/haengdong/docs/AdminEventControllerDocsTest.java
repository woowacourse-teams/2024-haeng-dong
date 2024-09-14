package server.haengdong.docs;

import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.cookies.CookieDocumentation.cookieWithName;
import static org.springframework.restdocs.cookies.CookieDocumentation.requestCookies;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static server.haengdong.support.fixture.Fixture.EVENT_COOKIE;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import server.haengdong.application.EventService;
import server.haengdong.presentation.admin.AdminEventController;
import server.haengdong.presentation.request.EventUpdateRequest;

class AdminEventControllerDocsTest extends RestDocsSupport {

    private final EventService eventService = mock(EventService.class);

    @Override
    protected Object initController() {
        return new AdminEventController(eventService);
    }

    @DisplayName("행사 어드민 권한을 확인한다.")
    @Test
    void authenticateTest() throws Exception {
        String token = "TOKEN";
        mockMvc.perform(post("/api/admin/events/{eventId}/auth", token)
                        .cookie(EVENT_COOKIE))
                .andDo(print())
                .andExpect(status().isOk())

                .andDo(
                        document("authenticateEvent",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID")
                                ),
                                requestCookies(
                                        cookieWithName("eventToken").description("행사 관리자 토큰").optional()
                                )
                        )
                );
    }

    @DisplayName("행사 정보를 업데이트한다.")
    @Test
    void updateEventTest() throws Exception {
        String token = "TOKEN";
        EventUpdateRequest eventUpdateRequest = new EventUpdateRequest("행동대장 비대위", "행대뱅크", "12345678");

        String requestBody = objectMapper.writeValueAsString(eventUpdateRequest);

        mockMvc.perform(patch("/api/admin/events/{eventId}", token)
                                .cookie(EVENT_COOKIE)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(requestBody))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(
                        document("updateEvent",
                                 preprocessRequest(prettyPrint()),
                                 preprocessResponse(prettyPrint()),
                                 pathParameters(
                                         parameterWithName("eventId").description("행사 ID")
                                 ),
                                 requestCookies(
                                         cookieWithName("eventToken").description("행사 관리자 토큰")
                                 ),
                                 requestFields(
                                        fieldWithPath("eventName").type(JsonFieldType.STRING)
                                                .description("수정할 이벤트 이름"),
                                        fieldWithPath("bankName").type(JsonFieldType.STRING)
                                                .description("은행 이름"),
                                        fieldWithPath("accountNumber").type(JsonFieldType.STRING)
                                                .description("계좌 번호")
                                 )
                        )
                );
    }

//
//    @DisplayName("행사 참여 인원의 이름을 수정한다.")
//    @Test
//    void updateMember() throws Exception {
//        String token = "TOKEN";
//        MemberNamesUpdateRequest memberNameUpdateRequest = new MemberNamesUpdateRequest(List.of(
//                new MemberNameUpdateRequest("토다링", "토쟁이"),
//                new MemberNameUpdateRequest("감자", "고구마")
//        ));
//
//        String requestBody = objectMapper.writeValueAsString(memberNameUpdateRequest);
//
//        mockMvc.perform(put("/api/admin/events/{eventId}/billDetails/nameChange", token)
//                        .cookie(EVENT_COOKIE)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(requestBody))
//                .andDo(print())
//                .andExpect(status().isOk())
//                .andDo(
//                        document("updateEventMemberName",
//                                preprocessRequest(prettyPrint()),
//                                preprocessResponse(prettyPrint()),
//                                pathParameters(
//                                        parameterWithName("eventId").description("행사 ID")
//                                ),
//                                requestCookies(
//                                        cookieWithName("eventToken").description("행사 관리자 토큰")
//                                ),
//                                requestFields(
//                                        fieldWithPath("billDetails").type(JsonFieldType.ARRAY).description("수정할 참여자 목록"),
//                                        fieldWithPath("billDetails[].before").type(JsonFieldType.STRING)
//                                                .description("수정 전 참여자 이름"),
//                                        fieldWithPath("billDetails[].after").type(JsonFieldType.STRING)
//                                                .description("수정 후 참여자 이름")
//                                )
//                        )
//                );
//    }
}
