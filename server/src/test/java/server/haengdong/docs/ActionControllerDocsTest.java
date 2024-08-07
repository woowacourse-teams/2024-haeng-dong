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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import server.haengdong.application.ActionService;
import server.haengdong.application.response.MemberBillReportAppResponse;
import server.haengdong.presentation.ActionController;

class ActionControllerDocsTest extends RestDocsSupport {

    private final ActionService actionService = mock(ActionService.class);

    @Override
    protected Object initController() {
        return new ActionController(actionService);
    }

    @DisplayName("참여자별 정산 현황을 조회한다.")
    @Test
    void getMemberBillReports() throws Exception {
        List<MemberBillReportAppResponse> memberBillReportAppResponses = List.of(
                new MemberBillReportAppResponse("소하", 20_000L), new MemberBillReportAppResponse("토다리", 200_000L));

        given(actionService.getMemberBillReports(any())).willReturn(memberBillReportAppResponses);

        mockMvc.perform(get("/api/events/{eventId}/actions/reports", "망쵸토큰")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.reports[0].name").value(equalTo("소하")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.reports[0].price").value(equalTo(20_000)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.reports[1].name").value(equalTo("토다리")))
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
                                        fieldWithPath("reports[0].name").type(JsonFieldType.STRING)
                                                .description("참여자 이름"),
                                        fieldWithPath("reports[0].price").type(JsonFieldType.NUMBER)
                                                .description("참여자 정산 금액")
                                ))
                );
    }
}
