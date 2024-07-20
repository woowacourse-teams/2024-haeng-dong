package server.haengdong.presentation;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import server.haengdong.application.EventService;
import server.haengdong.application.request.EventAppRequest;
import server.haengdong.application.response.EventAppResponse;
import server.haengdong.presentation.request.EventSaveRequest;

@WebMvcTest(EventController.class)
class EventControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private EventService eventService;

    @DisplayName("이벤트를 생성한다.")
    @Test
    void saveEvent() throws Exception {
        EventSaveRequest eventSaveRequest = new EventSaveRequest("토다리");
        String requestBody = objectMapper.writeValueAsString(eventSaveRequest);
        String token = "TOKEN";
        EventAppResponse eventAppResponse = new EventAppResponse(token);
        given(eventService.saveEvent(any(EventAppRequest.class))).willReturn(eventAppResponse);

        mockMvc.perform(post("/api/events")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.redirectedUrl("events/" + token));
    }
}
