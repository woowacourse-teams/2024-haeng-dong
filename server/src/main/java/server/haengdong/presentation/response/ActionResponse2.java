package server.haengdong.presentation.response;

import server.haengdong.application.response.ActionAppResponse;

public record ActionResponse2(
        Long actionId,
        String name,
        Long price,
        Long sequence,
        String type
) {

    public static ActionResponse2 of(ActionAppResponse actionAppResponse) {
        return new ActionResponse2(
                actionAppResponse.actionId(),
                actionAppResponse.name(),
                actionAppResponse.price(),
                actionAppResponse.sequence(),
                actionAppResponse.actionType().name()
        );
    }
}
