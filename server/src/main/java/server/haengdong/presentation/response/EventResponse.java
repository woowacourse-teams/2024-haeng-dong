package server.haengdong.presentation.response;

import server.haengdong.application.response.EventAppResponse;

public record EventResponse(String url) {

    public static EventResponse of(EventAppResponse eventAppResponse) {
        return new EventResponse(eventAppResponse.token());
    }
}
