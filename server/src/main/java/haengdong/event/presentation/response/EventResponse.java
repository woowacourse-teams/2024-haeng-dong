package haengdong.event.presentation.response;

import haengdong.event.application.response.EventAppResponse;

public record EventResponse(String eventId) {

    public static EventResponse of(EventAppResponse eventAppResponse) {
        return new EventResponse(eventAppResponse.token());
    }
}
