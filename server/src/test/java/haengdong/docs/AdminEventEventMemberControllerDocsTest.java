package haengdong.docs;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.cookies.CookieDocumentation.cookieWithName;
import static org.springframework.restdocs.cookies.CookieDocumentation.requestCookies;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static haengdong.support.fixture.Fixture.EVENT_COOKIE;

import haengdong.user.domain.Nickname;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import haengdong.event.application.EventMemberService;
import haengdong.event.application.response.MemberSaveAppResponse;
import haengdong.event.application.response.MembersSaveAppResponse;
import haengdong.event.presentation.admin.AdminMemberController;
import haengdong.event.presentation.request.MemberSaveRequest;
import haengdong.event.presentation.request.MemberUpdateRequest;
import haengdong.event.presentation.request.MembersSaveRequest;
import haengdong.event.presentation.request.MembersUpdateRequest;

class AdminEventEventMemberControllerDocsTest extends RestDocsSupport {

    private final EventMemberService eventMemberService = mock(EventMemberService.class);

    @Override
    protected Object initController() {
        return new AdminMemberController(eventMemberService);
    }

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
                        new MemberSaveAppResponse(1L, new Nickname("웨디")),
                        new MemberSaveAppResponse(2L, new Nickname("소하"))
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
                .andExpect(MockMvcResultMatchers.jsonPath("$.members[1].name").value(equalTo("소하")))
                .andDo(
                        document("saveMembers",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID")
                                ),
                                requestCookies(
                                        cookieWithName("accessToken").description("토큰 토큰")
                                ),
                                requestFields(
                                        fieldWithPath("members").type(JsonFieldType.ARRAY)
                                                .description("행사에 추가할 참여자 목록"),
                                        fieldWithPath("members[].name").type(JsonFieldType.STRING)
                                                .description("참여자 이름")
                                ),
                                responseFields(
                                        fieldWithPath("members").type(JsonFieldType.ARRAY)
                                                .description("행사에 추가된 참여자 목록"),
                                        fieldWithPath("members[].id").type(JsonFieldType.NUMBER)
                                                .description("참여자 ID"),
                                        fieldWithPath("members[].name").type(JsonFieldType.STRING)
                                                .description("참여자 이름")
                                )
                        )
                );
    }

    @DisplayName("행사 참여 인원을 삭제한다.")
    @Test
    void deleteMember() throws Exception {
        String eventId = "망쵸토큰";
        Long memberId = 1L;

        mockMvc.perform(delete("/api/admin/events/{eventId}/members/{memberId}", eventId, memberId)
                        .cookie(EVENT_COOKIE))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(
                        document("deleteMember",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID"),
                                        parameterWithName("memberId").description("삭제할 참여자 ID")
                                ),
                                requestCookies(
                                        cookieWithName("accessToken").description("행사 토큰")
                                )
                        )
                );
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
                .andExpect(status().isOk())
                .andDo(
                        document("updateMembers",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID")
                                ),
                                requestCookies(
                                        cookieWithName("accessToken").description("행사 토큰")
                                ),
                                requestFields(
                                        fieldWithPath("members").type(JsonFieldType.ARRAY)
                                                .description("수정할 참여자 목록"),
                                        fieldWithPath("members[].id").type(JsonFieldType.NUMBER)
                                                .description("참여자 ID"),
                                        fieldWithPath("members[].name").type(JsonFieldType.STRING)
                                                .description("참여자 이름"),
                                        fieldWithPath("members[].isDeposited").type(JsonFieldType.BOOLEAN)
                                                .description("참여자 입금 여부")
                                )
                        )
                );
    }
}
