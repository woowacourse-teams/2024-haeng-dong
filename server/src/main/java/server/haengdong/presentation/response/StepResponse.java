package server.haengdong.presentation.response;

import java.util.ArrayList;
import java.util.List;
import server.haengdong.application.response.ActionAppResponse;

public record StepResponse(
        String stepName,
        String type,
        List<String> members,
        List<ActionResponse> actions
) {
    public static StepResponse of(String stepName, List<String> members, List<ActionAppResponse> actions) {
        return new StepResponse(
                stepName,
                actions.get(0).actionTypeName(),
                new ArrayList<>(members),
                toActionsResponse(actions)
        );
    }

    private static List<ActionResponse> toActionsResponse(List<ActionAppResponse> actions) {
        return actions.stream()
                .map(ActionResponse::of)
                .toList();
    }
}
