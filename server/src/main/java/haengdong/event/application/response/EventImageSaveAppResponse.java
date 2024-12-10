package haengdong.event.application.response;

import haengdong.event.domain.event.image.EventImage;

public record EventImageSaveAppResponse(
        Long id,
        String name
) {

    public static EventImageSaveAppResponse of(EventImage eventImage) {
        return new EventImageSaveAppResponse(eventImage.getId(), eventImage.getName());
    }
}
