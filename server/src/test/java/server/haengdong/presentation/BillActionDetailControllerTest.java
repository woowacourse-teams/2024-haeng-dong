package server.haengdong.presentation;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import server.haengdong.application.response.BillActionDetailAppResponse;
import server.haengdong.application.response.BillActionDetailsAppResponse;

class BillActionDetailControllerTest extends ControllerTestSupport {

    @DisplayName("참여자별 지출 금액을 조회한다.")
    @Test
    void findBillActionDetails() throws Exception {
        BillActionDetailsAppResponse appResponse = new BillActionDetailsAppResponse(
                List.of(new BillActionDetailAppResponse("토다리", 1000L, false)));
        given(billActionDetailService.findBillActionDetails(anyString(), anyLong()))
                .willReturn(appResponse);

        mockMvc.perform(get("/api/events/{eventId}/bill-actions/{actionId}/fixed", "TOKEN", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.members").isArray())
                .andExpect(jsonPath("$.members[0].name").value("토다리"))
                .andExpect(jsonPath("$.members[0].price").value(1000L));
    }
}
