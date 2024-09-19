package server.haengdong.application.response;

import server.haengdong.domain.event.Event;

public record EventDetailAppResponse(
        String eventName,
        String account
) {

    public static EventDetailAppResponse of(Event event) {
        return new EventDetailAppResponse(event.getName(), event.getAccount());
    }
}
