package haengdong.event.presentation.response;

import haengdong.event.application.response.EventImageUrlAppResponse;

public record EventImageResponse(
        Long id,
        String url
) {

    public static EventImageResponse of(EventImageUrlAppResponse response) {
        return new EventImageResponse(response.id(), response.url());
    }
}
