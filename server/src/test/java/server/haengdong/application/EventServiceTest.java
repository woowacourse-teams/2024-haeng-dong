package server.haengdong.application;


import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import server.haengdong.application.request.EventAppRequest;
import server.haengdong.application.response.EventAppResponse;
import server.haengdong.domain.event.EventTokenProvider;

@SpringBootTest
class EventServiceTest {

    @Autowired
    private EventService eventService;

    @MockBean
    private EventTokenProvider eventTokenProvider;

    @DisplayName("행사를 생성한다")
    @Test
    void saveEventTest() {
        EventAppRequest request = new EventAppRequest("test");
        given(eventTokenProvider.createToken()).willReturn("TOKEN");

        EventAppResponse response = eventService.saveEvent(request);

        assertThat(response.token()).isEqualTo("TOKEN");
    }
}
