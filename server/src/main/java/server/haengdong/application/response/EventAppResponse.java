package server.haengdong.application.response;

import server.haengdong.domain.event.Event;

public record EventAppResponse(
        String token,
        Long userId
) {

    public static EventAppResponse of(Event event) {
        return new EventAppResponse(event.getToken(), event.getUserId());
    }
}
