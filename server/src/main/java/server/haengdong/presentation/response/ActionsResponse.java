package server.haengdong.presentation.response;

import java.util.List;
import server.haengdong.application.response.ActionAppResponse;

public record ActionsResponse(
        List<ActionResponse2> actions
) {
    public static ActionsResponse of(List<ActionAppResponse> actions) {
        return new ActionsResponse(actions.stream()
                                           .map(ActionResponse2::of)
                                           .toList());
    }
}
