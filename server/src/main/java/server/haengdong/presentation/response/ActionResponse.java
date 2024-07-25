package server.haengdong.presentation.response;

import server.haengdong.application.response.ActionAppResponse;

public record ActionResponse(
        Long actionId,
        String name,
        Long price,
        Long sequence
) {

    public static ActionResponse of(ActionAppResponse actionAppResponse) {
        return new ActionResponse(
                actionAppResponse.actionId(),
                actionAppResponse.name(),
                actionAppResponse.price(),
                actionAppResponse.sequence()
        );
    }
}
