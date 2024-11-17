package haengdong.event.application.response;

import haengdong.event.domain.event.Event;

public record EventDetailAppResponse(
        String eventName,
        String bankName,
        String accountNumber
) {

    public static EventDetailAppResponse of(Event event) {
        return new EventDetailAppResponse(event.getName(), event.getBankName(), event.getAccountNumber());
    }
}
