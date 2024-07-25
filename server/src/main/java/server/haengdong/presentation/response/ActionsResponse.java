package server.haengdong.presentation.response;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import server.haengdong.application.response.ActionAppResponse;

public record ActionsResponse(
        String type,
        String stepName,
        Set<String> members,
        List<ActionResponse> actions
) {

    public static ActionsResponse of(List<ActionAppResponse> actions, Set<String> members) {
        List<ActionResponse> actionResponses = actions.stream()
                .map(ActionResponse::of)
                .toList();

        String actionType = actions.get(0).actionTypeName();
        return new ActionsResponse(
                actionType,
                null,
                new HashSet<>(members),
                actionResponses
        );
    }
}
