package haengdong.event.application.response;

import haengdong.event.domain.event.Event;

public record EventDetailAppResponse(
        String eventName,
        String bankName,
        String accountNumber,
        Boolean createdByGuest
) {

    public static EventDetailAppResponse of(Event event, UserAppResponse user) {
        return new EventDetailAppResponse(event.getName(), user.bankName(), user.accountNumber(), user.isGuest());
    }
}
