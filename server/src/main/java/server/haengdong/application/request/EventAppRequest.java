package server.haengdong.application.request;

import server.haengdong.domain.Event;

public record EventAppRequest(String name) {

    public Event toEvent(String token) {
        return new Event(name, token);
    }
}
