package server.haengdong.docs;

import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.cookies.CookieDocumentation.cookieWithName;
import static org.springframework.restdocs.cookies.CookieDocumentation.requestCookies;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
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
import server.haengdong.application.BillActionService;
import server.haengdong.presentation.BillActionController;
import server.haengdong.presentation.request.BillActionSaveRequest;
import server.haengdong.presentation.request.BillActionUpdateRequest;
import server.haengdong.presentation.request.BillActionsSaveRequest;

class BillActionControllerDocsTest extends RestDocsSupport {

    private final BillActionService billActionService = mock(BillActionService.class);

    @Override
    protected Object initController() {
        return new BillActionController(billActionService);
    }

    @DisplayName("지출 내역을 생성한다.")
    @Test
    void saveAllBillAction() throws Exception {
        BillActionsSaveRequest request = new BillActionsSaveRequest(
                List.of(
                        new BillActionSaveRequest("뽕족", 10_000L),
                        new BillActionSaveRequest("인생맥주", 10_000L)
                )
        );
        String requestBody = objectMapper.writeValueAsString(request);
        String eventId = "쿠키토큰";

        mockMvc.perform(post("/api/events/{eventId}/bill-actions", eventId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .cookie(EVENT_COOKIE)
                        .content(requestBody))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("createBillActions",
                        pathParameters(
                                parameterWithName("eventId").description("행사 ID")
                        ),
                        requestCookies(
                                cookieWithName("eventToken").description("행사 관리자 토큰")
                        ),
                        requestFields(
                                fieldWithPath("actions").description("생성할 지출 액션 목록"),
                                fieldWithPath("actions[0].title").description("생성할 지출 액션의 제목"),
                                fieldWithPath("actions[0].price").description("생성할 지출 액션의 금액")
                        )
                ));
    }

    @DisplayName("지출 액션을 수정한다.")
    @Test
    void updateBillAction() throws Exception {
        BillActionUpdateRequest request = new BillActionUpdateRequest("뽕족", 10_000L);

        String requestBody = objectMapper.writeValueAsString(request);
        String eventId = "웨디토큰";

        mockMvc.perform(put("/api/events/{eventId}/bill-actions/{actionId}", eventId, 1L)
                        .cookie(EVENT_COOKIE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("updateBillAction",
                        pathParameters(
                                parameterWithName("eventId").description("행사 ID"),
                                parameterWithName("actionId").description("지출 액션 ID")
                        ),
                        requestCookies(
                                cookieWithName("eventToken").description("행사 관리자 토큰")
                        ),
                        requestFields(
                                fieldWithPath("title").description("수정할 지출 액션의 제목"),
                                fieldWithPath("price").description("수정할 지출 액션의 금액")
                        )
                ));
    }

    @DisplayName("지출 내역을 삭제한다.")
    @Test
    void deleteBillAction() throws Exception {
        String eventId = "토다리토큰";

        mockMvc.perform(delete("/api/events/{eventId}/bill-actions/{actionId}", eventId, 1)
                        .cookie(EVENT_COOKIE)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("deleteBillAction",
                        pathParameters(
                                parameterWithName("eventId").description("행사 ID"),
                                parameterWithName("actionId").description("지출 액션 ID")
                        ),
                        requestCookies(
                                cookieWithName("eventToken").description("행사 관리자 토큰")
                        )
                ));
    }
}
