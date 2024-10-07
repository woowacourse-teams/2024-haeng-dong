package server.haengdong.presentation;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import server.haengdong.application.AuthService;
import server.haengdong.application.BillService;
import server.haengdong.application.EventService;
import server.haengdong.application.ImageUploadService;
import server.haengdong.application.MemberService;
import server.haengdong.presentation.admin.AdminBillController;
import server.haengdong.presentation.admin.AdminEventController;
import server.haengdong.presentation.admin.AdminMemberController;

@WebMvcTest(
        controllers = {
                AdminEventController.class,
                AdminBillController.class,
                AdminMemberController.class,
                EventController.class,
                MemberController.class,
                BillController.class
        },
        excludeFilters = {@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = {WebMvcConfigurer.class})}
)
public abstract class ControllerTestSupport {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @MockBean
    protected EventService eventService;

    @MockBean
    protected AuthService authService;

    @MockBean
    protected MemberService memberService;

    @MockBean
    protected BillService billService;

    @MockBean
    protected ImageUploadService imageUploadService;
}
