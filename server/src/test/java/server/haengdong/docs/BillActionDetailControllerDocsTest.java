package server.haengdong.docs;

import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.cookies.CookieDocumentation.cookieWithName;
import static org.springframework.restdocs.cookies.CookieDocumentation.requestCookies;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
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

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import server.haengdong.application.BillActionDetailService;
import server.haengdong.presentation.BillActionDetailController;
import server.haengdong.presentation.request.BillActionDetailUpdateRequest;
import server.haengdong.presentation.request.BillActionDetailsUpdateRequest;

public class BillActionDetailControllerDocsTest extends RestDocsSupport {

    private final BillActionDetailService billActionDetailService = mock(BillActionDetailService.class);

    @Override
    protected Object initController() {
        return new BillActionDetailController(billActionDetailService);
    }

    @DisplayName("참여자별 지출 금액을 수정한다.")
    @Test
    void updateBillActionDetailsTest() throws Exception {
        List<BillActionDetailUpdateRequest> billActionDetailUpdateRequests = List.of(
                new BillActionDetailUpdateRequest("소하", 10000L),
                new BillActionDetailUpdateRequest("웨디", 20000L)
        );
        BillActionDetailsUpdateRequest request = new BillActionDetailsUpdateRequest(
                billActionDetailUpdateRequests);

        String json = objectMapper.writeValueAsString(request);

        mockMvc.perform(
                        put("/api/events/{eventId}/bill-actions/{actionId}/fixed", "TOKEN", 1L)
                                .cookie(EVENT_COOKIE)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(json))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(
                        document("updateBillActionDetailsTest",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID"),
                                        parameterWithName("actionId").description("액션 ID")
                                ),
                                requestCookies(
                                        cookieWithName("eventToken").description("행사 관리자 토큰")
                                ),
                                requestFields(
                                        fieldWithPath("members").type(JsonFieldType.ARRAY)
                                                .description("전체 정산 수정 요청 목록"),
                                        fieldWithPath("members[0].name").type(JsonFieldType.STRING)
                                                .description("참여자 이름"),
                                        fieldWithPath("members[0].price").type(JsonFieldType.NUMBER)
                                                .description("참여자 정산 금액")
                                )
                        )
                );
    }
}
