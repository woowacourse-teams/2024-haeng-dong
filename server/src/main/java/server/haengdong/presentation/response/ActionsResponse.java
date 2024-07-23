package server.haengdong.presentation.response;

import java.util.List;
import server.haengdong.application.response.ActionAppResponse;

public record ActionsResponse(List<ActionResponse> actions) {

    public static ActionsResponse of(List<ActionAppResponse> actions) {
        List<ActionResponse> actionResponses = actions.stream().map(ActionResponse::of).toList();
        return new ActionsResponse(actionResponses);
    }
}
