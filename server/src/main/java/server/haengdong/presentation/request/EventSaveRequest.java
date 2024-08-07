package server.haengdong.presentation.request;

import jakarta.validation.constraints.NotBlank;
import server.haengdong.application.request.EventAppRequest;

public record EventSaveRequest(

        @NotBlank
        String eventName,

        @NotBlank
        String password
) {

    public EventAppRequest toAppRequest() {
        return new EventAppRequest(eventName, password);
    }
}
