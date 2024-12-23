package haengdong.docs;

import static haengdong.support.fixture.Fixture.EVENT_COOKIE;
import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.cookies.CookieDocumentation.cookieWithName;
import static org.springframework.restdocs.cookies.CookieDocumentation.requestCookies;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.partWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParts;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import haengdong.event.application.EventImageFacadeService;
import haengdong.event.application.EventService;
import haengdong.event.presentation.admin.AdminEventController;
import haengdong.event.presentation.request.EventUpdateRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.payload.JsonFieldType;

class AdminEventControllerDocsTest extends RestDocsSupport {

    private final EventService eventService = mock(EventService.class);
    private final EventImageFacadeService eventImageFacadeService = mock(EventImageFacadeService.class);

    @Override
    protected Object initController() {
        return new AdminEventController(eventService, eventImageFacadeService);
    }

    @DisplayName("행사 어드민 권한을 확인한다.")
    @Test
    void authenticateTest() throws Exception {
        String token = "TOKEN";
        mockMvc.perform(post("/api/admin/events/{eventId}/auth", token)
                        .cookie(EVENT_COOKIE))
                .andDo(print())
                .andExpect(status().isOk())

                .andDo(
                        document("authenticateEvent",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID")
                                ),
                                requestCookies(
                                        cookieWithName("accessToken").description("행사 관리자 토큰").optional()
                                )
                        )
                );
    }

    @DisplayName("행사 정보를 업데이트한다.")
    @Test
    void updateEventTest() throws Exception {
        String token = "TOKEN";
        EventUpdateRequest eventUpdateRequest = new EventUpdateRequest("행동대장 비대위", null, null);

        String requestBody = objectMapper.writeValueAsString(eventUpdateRequest);

        mockMvc.perform(patch("/api/admin/events/{eventId}", token)
                                .cookie(EVENT_COOKIE)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(requestBody))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(
                        document("updateEvent",
                                 preprocessRequest(prettyPrint()),
                                 preprocessResponse(prettyPrint()),
                                 pathParameters(
                                         parameterWithName("eventId").description("행사 ID")
                                 ),
                                 requestCookies(
                                         cookieWithName("accessToken").description("행사 관리자 토큰")
                                 ),
                                 requestFields(
                                        fieldWithPath("eventName").type(JsonFieldType.STRING)
                                                .description("수정할 이벤트 이름").optional(),
                                         fieldWithPath("bankName").type(JsonFieldType.STRING)
                                                 .description("수정할 은행 이름").optional(),
                                         fieldWithPath("accountNumber").type(JsonFieldType.STRING)
                                                 .description("수정할 계좌번호").optional()
                                 )
                        )
                );
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
                .andExpect(status().isOk())
                .andDo(
                        document("uploadImages",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID")
                                ),
                                requestCookies(
                                        cookieWithName("accessToken").description("행사 관리자 토큰")
                                ),
                                requestParts(
                                        partWithName("images").description("행사 이미지")
                                )
                        )
                );
    }

    @DisplayName("행사 이미지를 삭제한다.")
    @Test
    void deleteImage() throws Exception {
        String token = "TOKEN";

        mockMvc.perform(delete("/api/admin/events/{eventId}/images/{imageId}", token, 1L)
                        .cookie(EVENT_COOKIE))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(
                        document("deleteImage",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID"),
                                        parameterWithName("imageId").description("이미지 ID")
                                ),
                                requestCookies(
                                        cookieWithName("accessToken").description("행사 관리자 토큰")
                                )
                        )
                );
    }
}
