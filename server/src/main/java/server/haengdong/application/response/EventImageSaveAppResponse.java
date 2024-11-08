package server.haengdong.application.response;

import server.haengdong.domain.event.EventImage;

public record EventImageSaveAppResponse(
        Long id,
        String name
) {

    public static EventImageSaveAppResponse of(EventImage eventImage) {
        return new EventImageSaveAppResponse(eventImage.getId(), eventImage.getName());
    }
}
