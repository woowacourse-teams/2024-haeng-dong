package server.haengdong.application.response;

import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventImage;

public record ImageNameAppResponse(String name) {

    public EventImage toEventImage(Event event) {
        return new EventImage(event, name);
    }
}
