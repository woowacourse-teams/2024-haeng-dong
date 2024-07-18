package server.haengdong.presentation.request;

import server.haengdong.application.request.EventAppRequest;

public record EventSaveRequest(String name) {

    public EventAppRequest toAppRequest() {
        return new EventAppRequest(name);
    }
}
