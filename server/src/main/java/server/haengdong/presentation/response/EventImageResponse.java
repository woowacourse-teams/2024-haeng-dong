package server.haengdong.presentation.response;

import server.haengdong.application.response.EventImageAppResponse;

public record EventImageResponse(
        Long id,
        String url
) {

    public static EventImageResponse of(EventImageAppResponse response) {
        return new EventImageResponse(response.id(), response.url());
    }
}
