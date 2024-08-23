package server.haengdong.presentation.response;

import server.haengdong.application.response.ActionAppResponse;

public record ActionResponse(
        Long actionId,
        String name,
        Long price,
        Long sequence,
        boolean isFixed
) {
    
    public ActionResponse(Long actionId, String name, Long price, Long sequence) {
        this(actionId, name, price, sequence, false);
    }

    public static ActionResponse of(ActionAppResponse actionAppResponse) {
        return new ActionResponse(
                actionAppResponse.actionId(),
                actionAppResponse.name(),
                actionAppResponse.price(),
                actionAppResponse.sequence(),
                actionAppResponse.isFixed()
        );
    }
}
