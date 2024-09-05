package server.haengdong.presentation.admin;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import server.haengdong.presentation.ControllerTestSupport;
import server.haengdong.presentation.request.MemberNameUpdateRequest;
import server.haengdong.presentation.request.MemberNamesUpdateRequest;


class AdminEventControllerTest extends ControllerTestSupport {

    @DisplayName("행사 참여 인원의 이름을 수정한다.")
    @Test
    void updateMember() throws Exception {
        String token = "TOKEN";
        MemberNamesUpdateRequest memberNameUpdateRequest = new MemberNamesUpdateRequest(List.of(
                new MemberNameUpdateRequest("토다링", "토쟁이"),
                new MemberNameUpdateRequest("감자", "고구마")
        ));

        String requestBody = objectMapper.writeValueAsString(memberNameUpdateRequest);

        mockMvc.perform(put("/api/admin/events/{eventId}/members/nameChange", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
