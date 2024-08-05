package server.haengdong.presentation;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import server.haengdong.application.BillActionService;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;
import server.haengdong.presentation.request.BillActionSaveRequest;
import server.haengdong.presentation.request.BillActionsSaveRequest;
import server.haengdong.presentation.request.BillActionUpdateRequest;

@WebMvcTest(BillActionController.class)
class BillActionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private BillActionService billActionService;

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
                        .content(requestBody))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @DisplayName("title이 비어 있는 경우 지출 내역을 생성할 수 없다.")
    @Test
    void saveAllBillAction1() throws Exception {
        BillActionsSaveRequest request = new BillActionsSaveRequest(
                List.of(
                        new BillActionSaveRequest("", 10_000L),
                        new BillActionSaveRequest("인생맥주", 10_000L)
                )
        );
        String requestBody = objectMapper.writeValueAsString(request);
        String eventId = "소하토큰";

        mockMvc.perform(post("/api/events/{eventId}/bill-actions", eventId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @DisplayName("지출 액션을 수정한다.")
    @Test
    void updateBillAction() throws Exception {
        BillActionUpdateRequest request = new BillActionUpdateRequest("뽕족", 10_000L);

        String requestBody = objectMapper.writeValueAsString(request);
        String eventId = "웨디토큰";

        mockMvc.perform(put("/api/events/{eventId}/bill-actions/{actionId}", eventId, 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @DisplayName("지출 내역을 삭제한다.")
    @Test
    void deleteBillAction() throws Exception {
        String eventId = "토다리토큰";

        mockMvc.perform(delete("/api/events/{eventId}/bill-actions/{actionId}", eventId, 1))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @DisplayName("존재하지 않는 행사에 대한 지출 내역을 삭제할 수 없다.")
    @Test
    void deleteBillAction1() throws Exception {
        String eventId = "이상해토큰";
        doThrow(new HaengdongException(HaengdongErrorCode.NOT_FOUND_EVENT))
                .when(billActionService).deleteBillAction(any(String.class), any(Long.class));

        mockMvc.perform(delete("/api/events/{eventId}/bill-actions/{actionId}", eventId, 1))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }
}
