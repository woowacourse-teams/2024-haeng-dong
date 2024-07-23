package server.haengdong.presentation;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
import server.haengdong.application.MemberActionService;
import server.haengdong.presentation.request.MemberActionSaveRequest;
import server.haengdong.presentation.request.MemberActionsSaveRequest;

@WebMvcTest(MemberActionController.class)
class MemberActionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private MemberActionService memberActionService;

    @DisplayName("참여자 행동을 추가한다.")
    @Test
    void saveMemberActionTest() throws Exception {
        MemberActionsSaveRequest memberActionsSaveRequest = new MemberActionsSaveRequest(List.of(
                new MemberActionSaveRequest("웨디", "IN"),
                new MemberActionSaveRequest("소하", "IN"),
                new MemberActionSaveRequest("토다리", "IN"),
                new MemberActionSaveRequest("쿠키", "IN")));

        String requestBody = objectMapper.writeValueAsString(memberActionsSaveRequest);

        mockMvc.perform(post("/api/events/TOKEN/actions/members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
