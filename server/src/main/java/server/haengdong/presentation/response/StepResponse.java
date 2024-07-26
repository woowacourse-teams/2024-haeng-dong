package server.haengdong.presentation.response;

import java.util.ArrayList;
import java.util.List;
import server.haengdong.application.response.ActionAppResponse;

public record StepResponse(
        String type,
        String stepName,
        List<String> members,
        List<ActionResponse> actions
) {
    public static StepResponse of(List<ActionAppResponse> actions, List<String> members, String stepName) {
        return new StepResponse(
                actions.get(0).actionTypeName(),
                stepName,
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
