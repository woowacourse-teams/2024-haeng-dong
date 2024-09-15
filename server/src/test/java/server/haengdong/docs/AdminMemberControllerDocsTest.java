package server.haengdong.docs;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.cookies.CookieDocumentation.cookieWithName;
import static org.springframework.restdocs.cookies.CookieDocumentation.requestCookies;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static server.haengdong.support.fixture.Fixture.EVENT_COOKIE;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import server.haengdong.application.MemberService;
import server.haengdong.application.response.MemberSaveAppResponse;
import server.haengdong.application.response.MembersSaveAppResponse;
import server.haengdong.presentation.admin.AdminMemberController;
import server.haengdong.presentation.request.MemberSaveRequest;
import server.haengdong.presentation.request.MembersSaveRequest;

public class AdminMemberControllerDocsTest extends RestDocsSupport {

    private final MemberService memberService = mock(MemberService.class);

    @Override
    protected Object initController() {
        return new AdminMemberController(memberService);
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
                        new MemberSaveAppResponse(1L, "웨디"),
                        new MemberSaveAppResponse(2L, "소하")
                )
        );
        given(memberService.saveMembers(eventToken, membersSaveRequest.toAppRequest()))
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
                                        cookieWithName("eventToken").description("토큰 토큰")
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

//    @DisplayName("이벤트에 속한 멤버 액션을 삭제하면 이후에 기록된 해당 참여자의 모든 멤버 액션을 삭제한다.")
//    @Test
//    void deleteMemberAction() throws Exception {
//        String eventId = "망쵸토큰";
//        Long actionId = 2L;
//
//        mockMvc.perform(delete("/api/admin/events/{eventId}/member-actions/{actionId}", eventId, actionId)
//                        .cookie(EVENT_COOKIE))
//                .andDo(print())
//                .andExpect(status().isOk())
//                .andDo(
//                        document("deleteMemberAction",
//                                preprocessRequest(prettyPrint()),
//                                preprocessResponse(prettyPrint()),
//                                pathParameters(
//                                        parameterWithName("eventId").description("행사 ID"),
//                                        parameterWithName("actionId").description("액션 ID")
//                                ),
//                                requestCookies(
//                                        cookieWithName("eventToken").description("행사 관리자용 토큰")
//                                )
//                        )
//                );
//    }
//
//    @DisplayName("행사의 전체 참여자 중에서 특정 참여자의 맴버 액션을 전부 삭제한다.")
//    @Test
//    void deleteMember() throws Exception {
//        String eventId = "망쵸토큰";
//        String memberName = "행동대장";
//
//        mockMvc.perform(delete("/api/admin/events/{eventId}/billDetails/{memberName}", eventId, memberName)
//                        .cookie(EVENT_COOKIE))
//                .andDo(print())
//                .andExpect(status().isOk())
//                .andDo(
//                        document("deleteAllMemberActionByName",
//                                preprocessRequest(prettyPrint()),
//                                preprocessResponse(prettyPrint()),
//                                pathParameters(
//                                        parameterWithName("eventId").description("행사 ID"),
//                                        parameterWithName("memberName").description("행사 참여자 이름")
//                                ),
//                                requestCookies(
//                                        cookieWithName("eventToken").description("행사 관리자용 토큰")
//                                )
//                        )
//                );
//    }
}
