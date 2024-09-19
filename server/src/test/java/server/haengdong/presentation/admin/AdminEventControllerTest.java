package server.haengdong.presentation.admin;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import server.haengdong.presentation.ControllerTestSupport;
import server.haengdong.presentation.request.EventUpdateRequest;


class AdminEventControllerTest extends ControllerTestSupport {

    @DisplayName("행사 정보를 수정한다.")
    @Test
    void updateEventTest() throws Exception {
        String token = "TOKEN";
        EventUpdateRequest eventUpdateRequest = new EventUpdateRequest("행동대장 비대위", "행대뱅크", "12345678");

        String requestBody = objectMapper.writeValueAsString(eventUpdateRequest);

        mockMvc.perform(patch("/api/admin/events/{eventId}", token)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(requestBody))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
