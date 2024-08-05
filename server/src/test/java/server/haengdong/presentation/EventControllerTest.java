package server.haengdong.presentation;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
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
import server.haengdong.application.response.EventAppResponse;
import server.haengdong.application.response.EventDetailAppResponse;
import server.haengdong.application.response.MembersAppResponse;
import server.haengdong.presentation.request.EventSaveRequest;
import server.haengdong.presentation.request.MemberUpdateRequest;

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
        EventSaveRequest eventSaveRequest = new EventSaveRequest("토다리", "0987");
        String requestBody = objectMapper.writeValueAsString(eventSaveRequest);
        String eventId = "망쵸토큰";
        EventAppResponse eventAppResponse = new EventAppResponse(eventId);
        given(eventService.saveEvent(any(EventAppRequest.class))).willReturn(eventAppResponse);

        mockMvc.perform(post("/api/events")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.eventId").value("망쵸토큰"));
    }

    @DisplayName("토큰으로 행사를 조회한다.")
    @Test
    void findEventTest() throws Exception {
        String eventId = "망쵸토큰";
        EventDetailAppResponse eventDetailAppResponse = new EventDetailAppResponse("행동대장 회식");
        given(eventService.findEvent(eventId)).willReturn(eventDetailAppResponse);

        mockMvc.perform(get("/api/events/{eventId}", eventId))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.eventName").value("행동대장 회식"));
    }

    @DisplayName("행사에 참여한 전체 인원을 중복 없이 조회한다.")
    @Test
    void findAllMembersTest() throws Exception {
        MembersAppResponse memberAppResponse = new MembersAppResponse(List.of("토다리", "쿠키"));
        given(eventService.findAllMembers(anyString())).willReturn(memberAppResponse);

        mockMvc.perform(get("/api/events/{eventId}/members", "TOKEN"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.memberNames").isArray())
                .andExpect(jsonPath("$.memberNames[0]").value("토다리"))
                .andExpect(jsonPath("$.memberNames[1]").value("쿠키"));
    }

    @DisplayName("행사 참여 인원의 이름을 수정한다.")
    @Test
    void updateMember() throws Exception {
        String token = "TOKEN";
        MemberUpdateRequest memberUpdateRequest = new MemberUpdateRequest("변경된 이름");
        String requestBody = objectMapper.writeValueAsString(memberUpdateRequest);

        mockMvc.perform(put("/api/events/{eventId}/members/{memberName}", token, "변경 전 이름")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
