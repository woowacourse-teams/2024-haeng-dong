package server.haengdong.docs;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.cookies.CookieDocumentation.cookieWithName;
import static org.springframework.restdocs.cookies.CookieDocumentation.requestCookies;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static server.haengdong.support.fixture.Fixture.EVENT_COOKIE;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import server.haengdong.application.MemberActionService;
import server.haengdong.application.response.CurrentMemberAppResponse;
import server.haengdong.presentation.MemberActionController;
import server.haengdong.presentation.request.MemberActionsSaveRequest;

public class MemberActionControllerDocsTest extends RestDocsSupport {

    private final MemberActionService memberActionService = mock(MemberActionService.class);

    @Override
    protected Object initController() {
        return new MemberActionController(memberActionService);
    }

    @DisplayName("참여자 행동을 추가한다.")
    @Test
    void saveMemberActionTest() throws Exception {
        MemberActionsSaveRequest memberActionsSaveRequest = new MemberActionsSaveRequest(
                List.of("웨디", "소하", "토다리", "쿠키"), "IN");

        String requestBody = objectMapper.writeValueAsString(memberActionsSaveRequest);

        mockMvc.perform(post("/api/events/{eventId}/member-actions", "망쵸토큰")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody)
                        .cookie(EVENT_COOKIE))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(
                        document("createMemberAction",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID")
                                ),
                                requestCookies(
                                        cookieWithName("eventToken").description("토큰 토큰")
                                ),
                                requestFields(
                                        fieldWithPath("members").type(JsonFieldType.ARRAY)
                                                .description("액션 대상 참여자 목록"),
                                        fieldWithPath("status").type(JsonFieldType.STRING)
                                                .description("참여자 액션 상태 [IN(늦참), OUT(탈주)]")
                                )
                        )
                );
    }

    @DisplayName("현재 참여 인원을 조회합니다.")
    @Test
    void getCurrentMembers() throws Exception {
        List<CurrentMemberAppResponse> currentMemberAppResponses = List.of(
                new CurrentMemberAppResponse("소하"), new CurrentMemberAppResponse("토다리"));

        given(memberActionService.getCurrentMembers(any())).willReturn(currentMemberAppResponses);

        mockMvc.perform(get("/api/events/{eventId}/members/current", "망쵸토큰")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.memberNames[0]").value(equalTo("소하")))
                .andExpect(jsonPath("$.memberNames[1]").value(equalTo("토다리")))
                .andDo(
                        document("getCurrentMembers",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID")
                                ),
                                responseFields(
                                        fieldWithPath("memberNames").type(JsonFieldType.ARRAY)
                                                .description("현재 탈주 가능한 참여 인원 이름 목록")
                                )
                        )
                );
    }

    @DisplayName("이벤트에 속한 멤버 액션을 삭제하면 이후에 기록된 해당 참여자의 모든 멤버 액션을 삭제한다.")
    @Test
    void deleteMemberAction() throws Exception {
        String eventId = "망쵸토큰";
        Long actionId = 2L;

        mockMvc.perform(delete("/api/events/{eventId}/member-actions/{actionId}", eventId, actionId)
                        .cookie(EVENT_COOKIE))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(
                        document("deleteMemberAction",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID"),
                                        parameterWithName("actionId").description("액션 ID")
                                ),
                                requestCookies(
                                        cookieWithName("eventToken").description("행사 관리자용 토큰")
                                )
                        )
                );
    }

    @DisplayName("행사의 전체 참여자 중에서 특정 참여자의 맴버 액션을 전부 삭제한다.")
    @Test
    void deleteMember() throws Exception {
        String eventId = "망쵸토큰";
        String memberName = "행동대장";

        mockMvc.perform(delete("/api/events/{eventId}/members/{memberName}", eventId, memberName)
                        .cookie(EVENT_COOKIE))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(
                        document("deleteAllMemberActionByName",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID"),
                                        parameterWithName("memberName").description("행사 참여자 이름")
                                ),
                                requestCookies(
                                        cookieWithName("eventToken").description("행사 관리자용 토큰")
                                )
                        )
                );
    }
}
