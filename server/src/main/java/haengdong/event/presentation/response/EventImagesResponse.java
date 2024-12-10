package haengdong.event.presentation.response;

import haengdong.event.application.response.EventImageUrlAppResponse;
import java.util.List;

public record EventImagesResponse(List<EventImageResponse> images) {

    public static EventImagesResponse of(List<EventImageUrlAppResponse> responses) {
        List<EventImageResponse> images = responses.stream()
                .map(EventImageResponse::of)
                .toList();

        return new EventImagesResponse(images);
    }
}
