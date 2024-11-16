package server.haengdong.application.request;

import server.haengdong.domain.event.Event;

public record EventAppRequest(String name, Long userId) {

    public Event toEvent(String token) {
        return new Event(name, userId, token);
    }
}
