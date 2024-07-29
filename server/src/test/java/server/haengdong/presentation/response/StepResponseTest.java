package server.haengdong.presentation.response;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import server.haengdong.application.response.ActionAppResponse;
import server.haengdong.application.response.ActionAppResponse.ActionType;

@SpringBootTest
class StepResponseTest {

    @Autowired
    private ObjectMapper objectMapper;

    @DisplayName("")
    @Test
    void test() throws JsonProcessingException {
        List<ActionAppResponse> actionAppResponse = new ArrayList<>();

        // IN actions
        ActionAppResponse actionAppResponse1 = new ActionAppResponse(3L, "망쵸", null, 3L, ActionType.IN);
        actionAppResponse.add(actionAppResponse1);
        ActionAppResponse actionAppResponse2 = new ActionAppResponse(4L, "백호", null, 4L, ActionType.IN);
        actionAppResponse.add(actionAppResponse2);

        // BILL step 1
        ActionAppResponse actionAppResponse3 = new ActionAppResponse(1L, "감자탕", 10000L, 1L, ActionType.BILL);
        actionAppResponse.add(actionAppResponse3);
        ActionAppResponse actionAppResponse4 = new ActionAppResponse(2L, "인생네컷", 10000L, 2L, ActionType.BILL);
        actionAppResponse.add(actionAppResponse4);

        // IN actions
        ActionAppResponse actionAppResponse5 = new ActionAppResponse(5L, "소하", null, 5L, ActionType.IN);
        actionAppResponse.add(actionAppResponse5);
        ActionAppResponse actionAppResponse6 = new ActionAppResponse(6L, "웨디", null, 6L, ActionType.IN);
        actionAppResponse.add(actionAppResponse6);

        // OUT actions
        ActionAppResponse actionAppResponse7 = new ActionAppResponse(7L, "망쵸", null, 7L, ActionType.OUT);
        actionAppResponse.add(actionAppResponse7);
        ActionAppResponse actionAppResponse8 = new ActionAppResponse(8L, "백호", null, 8L, ActionType.OUT);
        actionAppResponse.add(actionAppResponse8);

        // BILL step 2
        ActionAppResponse actionAppResponse9 = new ActionAppResponse(9L, "노래방", 20000L, 10L, ActionType.BILL);
        actionAppResponse.add(actionAppResponse9);

        // StepResponse creation
        StepResponse stepResponse = StepResponse.of(actionAppResponse);
        System.out.println("stepResponse = " + stepResponse);
    }
}
