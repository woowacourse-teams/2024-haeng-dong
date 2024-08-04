package server.haengdong.presentation;

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
        String token = "TOKEN";

        mockMvc.perform(post("/api/events/{token}/actions/bills", token)
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
        String token = "TOKEN";

        mockMvc.perform(post("/api/events/{token}/actions/bills", token)
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
        String token = "TOKEN";

        mockMvc.perform(put("/api/events/{token}/actions/bills/{actionId}", token, 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
