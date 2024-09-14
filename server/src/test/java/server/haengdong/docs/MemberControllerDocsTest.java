package server.haengdong.docs;

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
import static server.haengdong.support.fixture.Fixture.MEMBER1;
import static server.haengdong.support.fixture.Fixture.MEMBER2;
import static server.haengdong.support.fixture.Fixture.MEMBER3;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.restdocs.payload.JsonFieldType;
import server.haengdong.application.MemberService;
import server.haengdong.application.response.MemberDepositAppResponse;
import server.haengdong.application.response.MembersDepositAppResponse;
import server.haengdong.domain.action.Member;
import server.haengdong.presentation.MemberController;

public class MemberControllerDocsTest extends RestDocsSupport {

    private final MemberService memberService = mock(MemberService.class);

    @Override
    protected Object initController() {
        return new MemberController(memberService);
    }

    @DisplayName("행사에 참여한 전체 인원을 조회한다.")
    @Test
    void findAllMembersTest() throws Exception {
        Member member1 = MEMBER1;
        Member member2 = MEMBER2;
        Member member3 = MEMBER3;
        List<MemberDepositAppResponse> members = List.of(
                MemberDepositAppResponse.of(member1),
                MemberDepositAppResponse.of(member2),
                MemberDepositAppResponse.of(member3)
        );

        MembersDepositAppResponse memberAppResponse = new MembersDepositAppResponse(members);
        given(memberService.findAllMembers(anyString())).willReturn(memberAppResponse);

        mockMvc.perform(get("/api/events/{eventId}/members", "TOKEN"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.members").isArray())
//                .andExpect(jsonPath("$.members[0].id").value("null"))
                .andExpect(jsonPath("$.members[0].name").value(member1.getName()))
                .andExpect(jsonPath("$.members[0].isDeposited").value(member1.isDeposited()))
//                .andExpect(jsonPath("$.members[1].id").value("null"))
                .andExpect(jsonPath("$.members[1].name").value(member2.getName()))
                .andExpect(jsonPath("$.members[1].isDeposited").value(member2.isDeposited()))
//                .andExpect(jsonPath("$.members[2].id").value("null"))
                .andExpect(jsonPath("$.members[2].name").value(member3.getName()))
                .andExpect(jsonPath("$.members[2].isDeposited").value(member3.isDeposited()))
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
                                         fieldWithPath("members[0].id").type(JsonFieldType.NULL)
                                                 .description("멤버 ID"),
                                         fieldWithPath("members[0].name").type(JsonFieldType.STRING)
                                                 .description("멤버 이름"),
                                         fieldWithPath("members[0].isDeposited").type(JsonFieldType.BOOLEAN)
                                                 .description("입금 여부")
                                 )
                        )
                );
    }

//    @DisplayName("현재 참여 인원을 조회합니다.")
//    @Test
//    void getCurrentMembers() throws Exception {
//        List<LastBillMemberAppResponse> lastBillMemberAppRespons = List.of(
//                new LastBillMemberAppResponse("소하"), new LastBillMemberAppResponse("토다리"));
//
//        given(memberService.getCurrentMembers(any())).willReturn(lastBillMemberAppRespons);
//
//        mockMvc.perform(get("/api/events/{eventId}/billDetails/current", "망쵸토큰")
//                        .accept(MediaType.APPLICATION_JSON))
//                .andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.memberNames[0]").value(equalTo("소하")))
//                .andExpect(jsonPath("$.memberNames[1]").value(equalTo("토다리")))
//                .andDo(
//                        document("getCurrentMembers",
//                                preprocessRequest(prettyPrint()),
//                                preprocessResponse(prettyPrint()),
//                                pathParameters(
//                                        parameterWithName("eventId").description("행사 ID")
//                                ),
//                                responseFields(
//                                        fieldWithPath("memberNames").type(JsonFieldType.ARRAY)
//                                                .description("현재 탈주 가능한 참여 인원 이름 목록")
//                                )
//                        )
//                );
//    }
}
