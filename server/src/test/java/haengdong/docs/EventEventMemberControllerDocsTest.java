package haengdong.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import haengdong.user.domain.Nickname;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.restdocs.payload.JsonFieldType;
import haengdong.event.application.EventMemberService;
import haengdong.event.application.response.MemberAppResponse;
import haengdong.event.application.response.MemberDepositAppResponse;
import haengdong.event.application.response.MembersDepositAppResponse;
import haengdong.event.presentation.EventMemberController;

class EventEventMemberControllerDocsTest extends RestDocsSupport {

    private final EventMemberService eventMemberService = mock(EventMemberService.class);

    @Override
    protected Object initController() {
        return new EventMemberController(eventMemberService);
    }

    @DisplayName("행사에 참여한 전체 인원을 조회한다.")
    @Test
    void findAllMembersTest() throws Exception {
        List<MemberDepositAppResponse> members = List.of(
                new MemberDepositAppResponse(1L, new Nickname("감자"), false),
                new MemberDepositAppResponse(2L, new Nickname("백호"), true),
                new MemberDepositAppResponse(3L, new Nickname("이상"), true)
        );

        MembersDepositAppResponse memberAppResponse = new MembersDepositAppResponse(members);
        given(eventMemberService.findAllMembers(anyString())).willReturn(memberAppResponse);

        mockMvc.perform(get("/api/events/{eventId}/members", "TOKEN"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.members").isArray())
                .andExpect(jsonPath("$.members[0].id").value(1L))
                .andExpect(jsonPath("$.members[0].name").value("감자"))
                .andExpect(jsonPath("$.members[0].isDeposited").value(false))
                .andExpect(jsonPath("$.members[1].id").value(2L))
                .andExpect(jsonPath("$.members[1].name").value("백호"))
                .andExpect(jsonPath("$.members[1].isDeposited").value(true))
                .andExpect(jsonPath("$.members[2].id").value(3L))
                .andExpect(jsonPath("$.members[2].name").value("이상"))
                .andExpect(jsonPath("$.members[2].isDeposited").value(true))
                .andDo(
                        document("findAllMembers",
                                 preprocessRequest(prettyPrint()),
                                 preprocessResponse(prettyPrint()),
                                 pathParameters(
                                         parameterWithName("eventId").description("행사 ID")
                                 ),
                                 responseFields(
                                         fieldWithPath("members").type(JsonFieldType.ARRAY)
                                                 .description("행사에 참여 중인 전체 멤버 목록"),
                                         fieldWithPath("members[0].id").type(JsonFieldType.NUMBER)
                                                 .description("멤버 ID"),
                                         fieldWithPath("members[0].name").type(JsonFieldType.STRING)
                                                 .description("멤버 이름"),
                                         fieldWithPath("members[0].isDeposited").type(JsonFieldType.BOOLEAN)
                                                 .description("입금 여부")
                                 )
                        )
                );
    }

    @DisplayName("현재 참여 인원을 조회합니다.")
    @Test
    void getCurrentMembers() throws Exception {
        List<MemberAppResponse> members = List.of(
                new MemberAppResponse(1L, new Nickname("감자")),
                new MemberAppResponse(2L, new Nickname("백호"))
        );

        given(eventMemberService.getCurrentMembers(any())).willReturn(members);

        mockMvc.perform(get("/api/events/{eventId}/members/current", "TOKEN"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.members").isArray())
                .andExpect(jsonPath("$.members[0].id").value(1L))
                .andExpect(jsonPath("$.members[0].name").value("감자"))
                .andExpect(jsonPath("$.members[1].id").value(2L))
                .andExpect(jsonPath("$.members[1].name").value("백호"))
                .andDo(
                        document("getCurrentMembers",
                                 preprocessRequest(prettyPrint()),
                                 preprocessResponse(prettyPrint()),
                                 pathParameters(
                                         parameterWithName("eventId").description("행사 ID")
                                 ),
                                 responseFields(
                                         fieldWithPath("members").type(JsonFieldType.ARRAY)
                                                 .description("현재 행사에 참여 중인 멤버 목록"),
                                         fieldWithPath("members[0].id").type(JsonFieldType.NUMBER)
                                                 .description("멤버 ID"),
                                         fieldWithPath("members[0].name").type(JsonFieldType.STRING)
                                                 .description("멤버 이름")
                                 )
                        )
                );
    }
}
