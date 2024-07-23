package server.haengdong.presentation.response;

import server.haengdong.application.response.EventDetailAppResponse;

public record EventDetailResponse(String eventName) {

    public static EventDetailResponse of(EventDetailAppResponse response) {
        return new EventDetailResponse(response.eventName());
    }
}
