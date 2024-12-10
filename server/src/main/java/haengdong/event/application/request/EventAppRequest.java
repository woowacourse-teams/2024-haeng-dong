package haengdong.event.application.request;

import haengdong.event.domain.event.Event;

public record EventAppRequest(String name, Long userId) {

    public Event toEvent(String token) {
        return new Event(name, userId, token);
    }
}
