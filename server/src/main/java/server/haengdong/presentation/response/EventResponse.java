package server.haengdong.presentation.response;

import server.haengdong.application.response.EventAppResponse;

public record EventResponse(String eventId) {

    public static EventResponse of(EventAppResponse eventAppResponse) {
        return new EventResponse(eventAppResponse.token());
    }
}
