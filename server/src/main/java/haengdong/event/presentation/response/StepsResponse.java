package haengdong.event.presentation.response;

import java.util.List;
import haengdong.event.application.response.StepAppResponse;

public record StepsResponse(
        List<StepResponse> steps
) {

    public static StepsResponse of(List<StepAppResponse> steps) {
        return new StepsResponse(steps.stream()
                .map(StepResponse::of)
                .toList());
    }
}
