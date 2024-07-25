package server.haengdong.presentation.response;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import server.haengdong.application.response.ActionAppResponse;

public record StepResponse(
        List<ActionsResponse> steps
) {

    public static StepResponse of(List<ActionAppResponse> actions) {
        if (actions.isEmpty()) {
            return new StepResponse(List.of());
        }
        List<ActionsResponse> actionsResponse = new ArrayList<>();
        Set<String> members = new HashSet<>();
        ActionAppResponse firstAction = getFirstAction(actions);
        List<ActionAppResponse> group = new ArrayList<>();
        group.add(firstAction);
        String currentActionType = firstAction.actionTypeName();
        members.add(firstAction.name());

        for (int i = 1; i < actions.size(); i++) {
            ActionAppResponse action = actions.get(i);
            String typeName = action.actionTypeName();
            if (currentActionType.equals(typeName)) {
                if (typeName.equals("IN")) {
                    members.add(action.name());
                }
                if (typeName.equals("OUT")) {
                    members.remove(action.name());
                }
                group.add(action);
                continue;
            }
            if (currentActionType.equals("BILL")) {
                actionsResponse.add(ActionsResponse.of(group, members));
            }
            currentActionType = typeName;
            group.clear();
            if (typeName.equals("IN")) {
                members.add(action.name());
            }
            if (typeName.equals("OUT")) {
                members.remove(action.name());
            }
            group.add(action);
        }

        if (currentActionType.equals("BILL")) {
            actionsResponse.add(ActionsResponse.of(group, members));
        }

        return new StepResponse(actionsResponse);
    }

    private static ActionAppResponse getFirstAction(List<ActionAppResponse> actions) {
        return actions.get(0);
    }
}
