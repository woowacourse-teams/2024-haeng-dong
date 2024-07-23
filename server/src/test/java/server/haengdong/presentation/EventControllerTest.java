package server.haengdong.presentation;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
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
import server.haengdong.application.EventService;
import server.haengdong.application.request.EventAppRequest;
import server.haengdong.application.response.ActionAppResponse;
import server.haengdong.application.response.EventAppResponse;
import server.haengdong.application.response.EventDetailAppResponse;
import server.haengdong.domain.action.Action;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionStatus;
import server.haengdong.domain.event.Event;
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
                .andExpect(jsonPath("$.eventId").value("TOKEN"));
    }

    @DisplayName("토큰으로 행사를 조회한다.")
    @Test
    void findEventTest() throws Exception {
        String token = "TOKEN";
        EventDetailAppResponse eventDetailAppResponse = new EventDetailAppResponse("행동대장 회식");
        given(eventService.findEvent(token)).willReturn(eventDetailAppResponse);

        mockMvc.perform(get("/api/events/" + token))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.eventName").value("행동대장 회식"));
    }

    @DisplayName("토큰으로 행사의 모든 액션을 조회한다.")
    @Test
    void findActionsTest() throws Exception {
        String token = "TOKEN";
        Event event = new Event("행동대장 회식", token);
        Action action1 = new Action(event, 1L);
        MemberAction memberAction = new MemberAction(action1, "소하", MemberActionStatus.IN, 1L);
        Action action2 = new Action(event, 2L);
        BillAction billAction = new BillAction(action2, "뽕나무쟁이족발", 30000L);
        given(eventService.findActions(token)).willReturn(
                List.of(ActionAppResponse.of(memberAction), ActionAppResponse.of(billAction)));

        mockMvc.perform(get("/api/events/" + token + "/actions"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.actions").isArray())
                .andExpect(jsonPath("$.actions[0].name").value("소하"))
                .andExpect(jsonPath("$.actions[0].price").isEmpty())
                .andExpect(jsonPath("$.actions[0].sequence").value(1L))
                .andExpect(jsonPath("$.actions[0].type").value("IN"))
                .andExpect(jsonPath("$.actions[1].name").value("뽕나무쟁이족발"))
                .andExpect(jsonPath("$.actions[1].price").value(30000L))
                .andExpect(jsonPath("$.actions[1].sequence").value(2L))
                .andExpect(jsonPath("$.actions[1].type").value("BILL"));
    }
}
