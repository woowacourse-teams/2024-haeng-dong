package server.haengdong.application.response;

import server.haengdong.domain.event.Event;

public record EventAppResponse(String token) {

    public static EventAppResponse of(Event event) {
        return new EventAppResponse(event.getToken());
    }
}
