package server.haengdong.presentation.response;

import java.util.List;
import server.haengdong.application.response.EventImageAppResponse;

public record EventImagesResponse(List<String> urls) {
    public static EventImagesResponse of(List<EventImageAppResponse> images) {
        List<String> urls = images.stream()
                .map(EventImageAppResponse::url)
                .toList();

        return new EventImagesResponse(urls);
    }
}
