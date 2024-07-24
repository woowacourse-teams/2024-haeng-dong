package server.haengdong.presentation.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import server.haengdong.application.request.EventAppRequest;

public record EventSaveRequest(

        @NotBlank
        @Size(min = 2, max = 20)
        String eventName
) {

    public EventAppRequest toAppRequest() {
        return new EventAppRequest(eventName);
    }
}
