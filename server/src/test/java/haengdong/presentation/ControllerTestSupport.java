package haengdong.presentation;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import haengdong.common.auth.application.AuthService;
import haengdong.event.application.BillService;
import haengdong.event.application.EventImageFacadeService;
import haengdong.event.application.EventService;
import haengdong.event.application.EventMemberService;
import haengdong.user.application.UserService;
import haengdong.event.presentation.BillController;
import haengdong.event.presentation.EventController;
import haengdong.event.presentation.EventMemberController;
import haengdong.event.presentation.admin.AdminBillController;
import haengdong.event.presentation.admin.AdminEventController;
import haengdong.event.presentation.admin.AdminMemberController;

@WebMvcTest(
        controllers = {
                AdminEventController.class,
                AdminBillController.class,
                AdminMemberController.class,
                EventController.class,
                EventMemberController.class,
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
    protected EventMemberService eventMemberService;

    @MockBean
    protected BillService billService;

    @MockBean
    protected EventImageFacadeService eventImageFacadeService;

    @MockBean
    protected UserService userService;
}
