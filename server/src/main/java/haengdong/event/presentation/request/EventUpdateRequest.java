package haengdong.event.presentation.request;

import haengdong.event.application.request.EventUpdateAppRequest;
import jakarta.validation.constraints.NotBlank;

public record EventUpdateRequest(
        @NotBlank
        String eventName
) {

    public EventUpdateAppRequest toAppRequest() {
        return new EventUpdateAppRequest(eventName);
    }
}
