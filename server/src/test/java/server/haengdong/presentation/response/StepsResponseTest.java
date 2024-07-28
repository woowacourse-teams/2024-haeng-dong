package server.haengdong.presentation.response;


import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import server.haengdong.application.response.ActionAppResponse;
import server.haengdong.application.response.ActionAppResponse.ActionType;

class StepsResponseTest {

    @DisplayName("이웃한 같은 타입의 액션들을 그룹화 하여 응답객체를 생성한다.")
    @Test
    void of() {
        List<ActionAppResponse> actions = List.of(
                new ActionAppResponse(1L, "망쵸", null, 1L, ActionType.IN),
                new ActionAppResponse(2L, "백호", null, 2L, ActionType.IN),
                new ActionAppResponse(3L, "감자탕", 10_000L, 3L, ActionType.BILL),
                new ActionAppResponse(4L, "인생네컷", 10_000L, 4L, ActionType.BILL),
                new ActionAppResponse(5L, "소하", null, 5L, ActionType.IN),
                new ActionAppResponse(6L, "웨디", null, 6L, ActionType.IN),
                new ActionAppResponse(7L, "망쵸", null, 7L, ActionType.OUT),
                new ActionAppResponse(8L, "백호", null, 8L, ActionType.OUT),
                new ActionAppResponse(9L, "노래방", 20_000L, 9L, ActionType.BILL)
        );

        StepsResponse stepsResponse = StepsResponse.of(actions);

        StepsResponse expected = new StepsResponse(
                List.of(
                        new StepResponse("IN", "0차", List.of("망쵸", "백호"), List.of(
                                new ActionResponse(1L, "망쵸", null, 1L),
                                new ActionResponse(2L, "백호", null, 2L)
                        )),
                        new StepResponse("BILL", "1차", List.of("망쵸", "백호"), List.of(
                                new ActionResponse(3L, "감자탕", 10_000L, 3L),
                                new ActionResponse(4L, "인생네컷", 10_000L, 4L)
                        )),
                        new StepResponse("IN", "1차", List.of("망쵸", "백호", "소하", "웨디"), List.of(
                                new ActionResponse(5L, "소하", null, 5L),
                                new ActionResponse(6L, "웨디", null, 6L)
                        )),
                        new StepResponse("OUT", "1차", List.of("소하", "웨디"), List.of(
                                new ActionResponse(7L, "망쵸", null, 7L),
                                new ActionResponse(8L, "백호", null, 8L)
                        )),
                        new StepResponse("BILL", "2차", List.of("소하", "웨디"), List.of(
                                new ActionResponse(9L, "노래방", 20_000L, 9L)
                        ))
                )
        );

        assertThat(stepsResponse).isEqualTo(expected);
    }

    @DisplayName("액션이 없으면 빈 스탭들이 만들어진다.")
    @Test
    void ofEmpty() {
        StepsResponse stepsResponse = StepsResponse.of(List.of());

        assertThat(stepsResponse.steps()).isEmpty();
    }
}
