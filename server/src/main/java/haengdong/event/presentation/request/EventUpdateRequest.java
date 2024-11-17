package haengdong.event.presentation.request;

import haengdong.event.application.request.EventUpdateAppRequest;

public record EventUpdateRequest(
        String eventName,
        String bankName,
        String accountNumber
) {

    public EventUpdateAppRequest toAppRequest() {
        return new EventUpdateAppRequest(eventName, bankName, accountNumber);
    }
}
