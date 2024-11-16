package server.haengdong.docs;

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
import server.haengdong.application.BillService;
import server.haengdong.presentation.admin.AdminBillController;
import server.haengdong.presentation.request.BillDetailUpdateRequest;
import server.haengdong.presentation.request.BillDetailsUpdateRequest;
import server.haengdong.presentation.request.BillSaveRequest;
import server.haengdong.presentation.request.BillUpdateRequest;
import server.haengdong.support.fixture.Fixture;

class AdminBillControllerDocsTest extends RestDocsSupport {

    private final BillService billService = mock(BillService.class);

    @Override
    protected Object initController() {
        return new AdminBillController(billService);
    }

    @DisplayName("지출 내역을 생성한다.")
    @Test
    void saveAllBill() throws Exception {
        List<Long> members = List.of(1L, 2L);
        BillSaveRequest request = new BillSaveRequest("뽕족", 10_000L, members);

        String requestBody = objectMapper.writeValueAsString(request);
        String eventId = "쿠키토큰";

        mockMvc.perform(post("/api/admin/events/{eventId}/bills", eventId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody)
                        .cookie(Fixture.EVENT_COOKIE))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("createBills",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("eventId").description("행사 ID")
                        ),
                        requestCookies(
                                cookieWithName("accessToken").description("행사 관리자 토큰")
                        ),
                        requestFields(
                                fieldWithPath("title").description("생성할 지출 제목"),
                                fieldWithPath("price").description("생성할 지출 금액"),
                                fieldWithPath("memberIds").description("생성할 지출의 참여인원 ID 리스트")
                        )
                ));
    }

    @DisplayName("지출을 수정한다.")
    @Test
    void updateBill() throws Exception {
        BillUpdateRequest request = new BillUpdateRequest("뽕족", 10_000L);

        String requestBody = objectMapper.writeValueAsString(request);
        String eventId = "웨디토큰";

        mockMvc.perform(put("/api/admin/events/{eventId}/bills/{billId}", eventId, 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody)
                        .cookie(EVENT_COOKIE))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("updateBill",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("eventId").description("행사 ID"),
                                parameterWithName("billId").description("지출 ID")
                        ),
                        requestCookies(
                                cookieWithName("accessToken").description("행사 관리자 토큰")
                        ),
                        requestFields(
                                fieldWithPath("title").description("수정할 지출 제목"),
                                fieldWithPath("price").description("수정할 지출 금액")
                        )
                ));
    }

    @DisplayName("참여자별 지출 금액을 수정한다.")
    @Test
    void updateBillDetailsTest() throws Exception {
        List<BillDetailUpdateRequest> billDetailUpdateRequests = List.of(
                new BillDetailUpdateRequest(1L, 10000L, true),
                new BillDetailUpdateRequest(2L, 20000L, true)
        );
        BillDetailsUpdateRequest request = new BillDetailsUpdateRequest(
                billDetailUpdateRequests);

        String json = objectMapper.writeValueAsString(request);

        mockMvc.perform(put("/api/admin/events/{eventId}/bills/{billId}/details", "TOKEN", 1L)
                        .cookie(EVENT_COOKIE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(
                        document("updateBillDetails",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID"),
                                        parameterWithName("billId").description("지출 ID")
                                ),
                                requestCookies(
                                        cookieWithName("accessToken").description("행사 관리자 토큰")
                                ),
                                requestFields(
                                        fieldWithPath("billDetails").type(JsonFieldType.ARRAY)
                                                .description("전체 정산 수정 요청 목록"),
                                        fieldWithPath("billDetails[0].id").type(JsonFieldType.NUMBER)
                                                .description("참여자 이름"),
                                        fieldWithPath("billDetails[0].price").type(JsonFieldType.NUMBER)
                                                .description("참여자 정산 금액"),
                                        fieldWithPath("billDetails[0].isFixed").type(JsonFieldType.BOOLEAN)
                                                .description("참여자 정산 금액 수정 여부")
                                )
                        )
                );
    }

    @DisplayName("지출 내역을 삭제한다.")
    @Test
    void deleteBill() throws Exception {
        String eventId = "토다리토큰";

        mockMvc.perform(delete("/api/admin/events/{eventId}/bills/{billId}", eventId, 1)
                        .cookie(EVENT_COOKIE)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("deleteBill",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("eventId").description("행사 ID"),
                                parameterWithName("billId").description("지출 ID")
                        ),
                        requestCookies(
                                cookieWithName("accessToken").description("행사 관리자 토큰")
                        )
                ));
    }
}
