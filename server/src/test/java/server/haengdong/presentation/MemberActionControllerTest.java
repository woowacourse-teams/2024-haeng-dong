package server.haengdong.presentation;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import server.haengdong.application.MemberActionService;
import server.haengdong.application.response.CurrentMemberAppResponse;
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

    @DisplayName("현재 참여 인원을 조회합니다.")
    @Test
    void getCurrentMembers() throws Exception {
        List<CurrentMemberAppResponse> currentMemberAppResponses = List.of(new CurrentMemberAppResponse("소하"), new CurrentMemberAppResponse("토다리"));

        given(memberActionService.getCurrentMembers(any())).willReturn(currentMemberAppResponses);

        mockMvc.perform(get("/api/events/{token}/members/current", "token")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.members[0].name").value(equalTo("소하")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.members[1].name").value(equalTo("토다리")));
    }
}
