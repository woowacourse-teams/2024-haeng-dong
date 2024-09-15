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

//    @DisplayName("행사 참여 인원의 이름을 수정한다.")
//    @Test
//    void updateMember() throws Exception {
//        String token = "TOKEN";
//        MemberNamesUpdateRequest memberNameUpdateRequest = new MemberNamesUpdateRequest(List.of(
//                new MemberNameUpdateRequest("토다링", "토쟁이"),
//                new MemberNameUpdateRequest("감자", "고구마")
//        ));
//
//        String requestBody = objectMapper.writeValueAsString(memberNameUpdateRequest);
//
//        mockMvc.perform(put("/api/admin/events/{eventId}/members/nameChange", token)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(requestBody))
//                .andDo(print())
//                .andExpect(status().isOk());
//    }
}
