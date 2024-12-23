package haengdong.event.application.response;

import haengdong.event.domain.event.Event;
import haengdong.user.domain.AccountNumber;
import haengdong.user.domain.Bank;

public record EventDetailAppResponse(
        String eventName,
        Bank bankName,
        AccountNumber accountNumber,
        Boolean createdByGuest
) {

    public static EventDetailAppResponse of(Event event, UserAppResponse user) {
        return new EventDetailAppResponse(event.getName(), event.getBank(), event.getAccountNumber(), user.isGuest());
    }
}
