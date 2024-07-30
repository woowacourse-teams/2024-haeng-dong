package server.haengdong.presentation.response;

import java.util.ArrayList;
import java.util.List;
import server.haengdong.application.response.ActionAppResponse;
import server.haengdong.application.response.ActionAppResponse.ActionType;

public record StepsResponse(List<StepResponse> steps) {

    public static StepsResponse of(List<ActionAppResponse> actions) {
        List<StepResponse> steps = new ArrayList<>();
        List<String> currentMembers = new ArrayList<>();
        List<List<ActionAppResponse>> groups = createGroups(actions);

        for (List<ActionAppResponse> group : groups) {
            changeCurrentMembers(group, currentMembers);
            StepResponse stepResponse = StepResponse.of(currentMembers, group);
            steps.add(stepResponse);
        }
        return new StepsResponse(steps);
    }

    private static List<List<ActionAppResponse>> createGroups(List<ActionAppResponse> actions) {
        List<List<ActionAppResponse>> groups = new ArrayList<>();

        for (ActionAppResponse action : actions) {
            if (groups.isEmpty() || isActionTypeChange(action, groups)) {
                groups.add(new ArrayList<>());
            }
            groups.get(groups.size() - 1).add(action);
        }

        return groups;
    }

    private static boolean isActionTypeChange(ActionAppResponse action, List<List<ActionAppResponse>> groups) {
        List<ActionAppResponse> currentGroup = groups.get(groups.size() - 1);
        return currentGroup.get(0).actionType() != action.actionType();
    }

    private static void changeCurrentMembers(List<ActionAppResponse> group, List<String> currentMembers) {
        for (ActionAppResponse action : group) {
            if (action.actionType() == ActionType.IN) {
                currentMembers.add(action.name());
                continue;
            }
            if (action.actionType() == ActionType.OUT) {
                currentMembers.remove(action.name());
            }
        }
    }
}
