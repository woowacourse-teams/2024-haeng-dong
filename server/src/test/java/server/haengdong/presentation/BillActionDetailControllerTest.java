package server.haengdong.presentation;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import server.haengdong.application.request.BillActionDetailsUpdateAppRequest;
import server.haengdong.presentation.request.BillActionDetailUpdateRequest;
import server.haengdong.presentation.request.BillActionDetailsUpdateRequest;

class BillActionDetailControllerTest extends ControllerTestSupport {

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

        doNothing().when(billActionDetailService)
                .updateBillActionDetails(anyString(), anyLong(), any(BillActionDetailsUpdateAppRequest.class));

        mockMvc.perform(put("/api/events/TOKEN/bill-actions/1/fixed")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
