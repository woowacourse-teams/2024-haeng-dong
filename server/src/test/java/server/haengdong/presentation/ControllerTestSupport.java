package server.haengdong.presentation;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import server.haengdong.application.ActionService;
import server.haengdong.application.AuthService;
import server.haengdong.application.BillActionDetailService;
import server.haengdong.application.BillActionService;
import server.haengdong.application.EventService;
import server.haengdong.application.MemberActionService;
import server.haengdong.presentation.admin.AdminBillActionController;
import server.haengdong.presentation.admin.AdminEventController;
import server.haengdong.presentation.admin.AdminMemberActionController;

@WebMvcTest(
        controllers = {
                AdminEventController.class,
                AdminBillActionController.class,
                AdminMemberActionController.class,
                EventController.class,
                MemberActionController.class,
                BillActionDetailController.class
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
    protected ActionService actionService;

    @MockBean
    protected MemberActionService memberActionService;

    @MockBean
    protected BillActionService billActionService;

    @MockBean
    protected BillActionDetailService billActionDetailService;
}
