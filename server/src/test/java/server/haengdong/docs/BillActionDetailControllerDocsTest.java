package server.haengdong.docs;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.cookies.CookieDocumentation.cookieWithName;
import static org.springframework.restdocs.cookies.CookieDocumentation.requestCookies;
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
import static server.haengdong.support.fixture.Fixture.EVENT_COOKIE;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.restdocs.payload.JsonFieldType;
import server.haengdong.application.BillDetailService;
import server.haengdong.application.response.BillDetailAppResponse;
import server.haengdong.application.response.BillDetailsAppResponse;
import server.haengdong.presentation.BillActionDetailController;

public class BillActionDetailControllerDocsTest extends RestDocsSupport {

    private final BillDetailService billDetailService = mock(BillDetailService.class);

    @Override
    protected Object initController() {
        return new BillActionDetailController(billDetailService);
    }

    @DisplayName("참여자별 지출 금액을 조회한다.")
    @Test
    void findBillActionDetailsTest() throws Exception {
        BillDetailsAppResponse appResponse = new BillDetailsAppResponse(
                List.of(new BillDetailAppResponse("토다리", 1000L, false)));
        given(billDetailService.findBillDetails(anyString(), anyLong()))
                .willReturn(appResponse);

        mockMvc.perform(get("/api/events/{eventId}/bill-actions/{actionId}/fixed", "TOKEN", 1L)
                        .cookie(EVENT_COOKIE))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.members").isArray())
                .andExpect(jsonPath("$.members[0].name").value("토다리"))
                .andExpect(jsonPath("$.members[0].price").value(1000L))
                .andExpect(jsonPath("$.members[0].isFixed").value(false))
                .andDo(
                        document("findBillActionDetailsTest",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID"),
                                        parameterWithName("actionId").description("액션 ID")
                                ), requestCookies(
                                        cookieWithName("eventToken").description("행사 관리자 토큰")
                                ), responseFields(
                                        fieldWithPath("billDetails").type(JsonFieldType.ARRAY)
                                                .description("전체 정산 수정 요청 목록"),
                                        fieldWithPath("billDetails[0].title").type(JsonFieldType.STRING)
                                                .description("참여자 이름"),
                                        fieldWithPath("billDetails[0].price").type(JsonFieldType.NUMBER)
                                                .description("참여자 정산 금액"),
                                        fieldWithPath("billDetails[0].isFixed").type(JsonFieldType.BOOLEAN)
                                                .description("참여자 정산 금액 수정 여부")
                                )
                        )
                );
    }
}
