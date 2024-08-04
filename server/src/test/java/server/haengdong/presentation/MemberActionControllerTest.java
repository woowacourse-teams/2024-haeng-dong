package server.haengdong.presentation;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
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
import server.haengdong.application.MemberActionService;
import server.haengdong.application.response.CurrentMemberAppResponse;
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
        MemberActionsSaveRequest memberActionsSaveRequest = new MemberActionsSaveRequest(
                List.of("웨디", "소하", "토다리", "쿠키"), "IN");

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
        List<CurrentMemberAppResponse> currentMemberAppResponses = List.of(
                new CurrentMemberAppResponse("소하"), new CurrentMemberAppResponse("토다리"));

        given(memberActionService.getCurrentMembers(any())).willReturn(currentMemberAppResponses);

        mockMvc.perform(get("/api/events/{token}/members/current", "token")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.members[0].name").value(equalTo("소하")))
                .andExpect(jsonPath("$.members[1].name").value(equalTo("토다리")));
    }

    @DisplayName("이벤트에 속한 멤버 액션을 삭제하면 이후에 기록된 해당 참여자의 모든 멤버 액션을 삭제한다.")
    @Test
    void deleteMemberAction() throws Exception {
        String token = "TOKEN";
        Long actionId = 2L;

        mockMvc.perform(delete("/api/events/{token}/actions/{actionId}/members", token, actionId))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @DisplayName("행사의 전체 참여자 중에서 특정 참여자의 맴버 액션을 전부 삭제한다.")
    @Test
    void deleteMember() throws Exception {
        String eventId = "TOKEN";
        String memberName = "행동대장";

        mockMvc.perform(delete("/api/events/{eventId}/members/{memberName}", eventId, memberName))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
