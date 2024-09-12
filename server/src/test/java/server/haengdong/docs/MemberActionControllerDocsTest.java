package server.haengdong.docs;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
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

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import server.haengdong.application.response.LastBillMemberAppResponse;

public class MemberActionControllerDocsTest extends RestDocsSupport {

    private final MemberActionService memberActionService = mock(MemberActionService.class);

    @Override
    protected Object initController() {
        return new MemberActionController(memberActionService);
    }

    @DisplayName("현재 참여 인원을 조회합니다.")
    @Test
    void getCurrentMembers() throws Exception {
        List<LastBillMemberAppResponse> lastBillMemberAppRespons = List.of(
                new LastBillMemberAppResponse("소하"), new LastBillMemberAppResponse("토다리"));

        given(memberActionService.getCurrentMembers(any())).willReturn(lastBillMemberAppRespons);

        mockMvc.perform(get("/api/events/{eventId}/billDetails/current", "망쵸토큰")
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
}
