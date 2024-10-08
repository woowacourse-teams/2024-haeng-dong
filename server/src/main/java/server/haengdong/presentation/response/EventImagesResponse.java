package server.haengdong.presentation.response;

import java.util.List;
import server.haengdong.application.response.EventImageAppResponse;

public record EventImagesResponse(List<EventImageResponse> images) {

    public static EventImagesResponse of(List<EventImageAppResponse> responses) {
        List<EventImageResponse> images = responses.stream()
                .map(EventImageResponse::of)
                .toList();

        return new EventImagesResponse(images);
    }
}
