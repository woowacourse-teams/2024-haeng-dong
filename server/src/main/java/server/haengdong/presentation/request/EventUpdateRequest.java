package server.haengdong.presentation.request;

import server.haengdong.application.request.EventUpdateAppRequest;

public record EventUpdateRequest(
        String eventName,
        String bankName,
        String accountNumber
) {

    public EventUpdateAppRequest toAppRequest() {
        return new EventUpdateAppRequest(eventName, bankName, accountNumber);
    }
}
