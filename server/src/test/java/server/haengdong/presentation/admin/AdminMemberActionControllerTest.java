package server.haengdong.presentation.admin;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import server.haengdong.presentation.ControllerTestSupport;
import server.haengdong.presentation.request.MemberInActionsSaveRequest;

class AdminMemberActionControllerTest extends ControllerTestSupport {

    @DisplayName("참여자 행동을 추가한다.")
    @Test
    void saveMemberActionTest() throws Exception {
        MemberInActionsSaveRequest memberActionsInSaveRequest = new MemberInActionsSaveRequest(
                List.of("웨디", "소하", "토다리", "쿠키"), "IN");

        String requestBody = objectMapper.writeValueAsString(memberActionsInSaveRequest);

        mockMvc.perform(post("/api/admin/events/{eventId}/member-actions", "망쵸토큰")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @DisplayName("이벤트에 속한 멤버 액션을 삭제하면 이후에 기록된 해당 참여자의 모든 멤버 액션을 삭제한다.")
    @Test
    void deleteMemberAction() throws Exception {
        String eventId = "망쵸토큰";
        Long actionId = 2L;

        mockMvc.perform(delete("/api/admin/events/{eventId}/member-actions/{actionId}", eventId, actionId))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @DisplayName("행사의 전체 참여자 중에서 특정 참여자의 맴버 액션을 전부 삭제한다.")
    @Test
    void deleteMember() throws Exception {
        String eventId = "망쵸토큰";
        String memberName = "행동대장";

        mockMvc.perform(delete("/api/admin/events/{eventId}/members/{memberName}", eventId, memberName))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
