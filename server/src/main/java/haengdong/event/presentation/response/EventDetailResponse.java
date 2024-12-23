package haengdong.event.presentation.response;

import haengdong.event.application.response.EventDetailAppResponse;
import haengdong.user.domain.AccountNumber;
import haengdong.user.domain.Bank;

public record EventDetailResponse(
        String eventName,
        String bankName,
        String accountNumber,
        Boolean createdByGuest
) {

    public static EventDetailResponse of(EventDetailAppResponse response) {
        Bank bank = response.bankName();
        AccountNumber accountNumber = response.accountNumber();
        return new EventDetailResponse(response.eventName(), bank == null ? "" : bank.getName(), accountNumber == null ? "" : accountNumber.getValue(), response.createdByGuest());
    }
}
