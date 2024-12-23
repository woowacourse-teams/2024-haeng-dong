package haengdong.presentation.admin;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static haengdong.support.fixture.Fixture.EVENT_COOKIE;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import haengdong.presentation.ControllerTestSupport;
import haengdong.event.presentation.request.EventUpdateRequest;


class AdminEventControllerTest extends ControllerTestSupport {

    @DisplayName("행사 정보를 수정한다.")
    @Test
    void updateEventTest() throws Exception {
        String token = "TOKEN";
        EventUpdateRequest eventUpdateRequest = new EventUpdateRequest("행동대장 비대위", null, null);

        String requestBody = objectMapper.writeValueAsString(eventUpdateRequest);

        mockMvc.perform(patch("/api/admin/events/{eventId}", token)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(requestBody))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @DisplayName("행사에 이미지를 업로드한다.")
    @Test
    void uploadImages() throws Exception {
        String token = "TOKEN";
        MockMultipartFile image1 = new MockMultipartFile("images", "image1.jpg", "image/jpeg", "이미지1".getBytes());
        MockMultipartFile image2 = new MockMultipartFile("images", "image2.jpg", "image/jpeg", "이미지2".getBytes());

        mockMvc.perform(multipart("/api/admin/events/{eventId}/images", token)
                        .file(image1)
                        .file(image2)
                        .cookie(EVENT_COOKIE)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
