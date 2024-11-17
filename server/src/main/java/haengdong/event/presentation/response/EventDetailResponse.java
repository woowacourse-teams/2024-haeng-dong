package haengdong.event.presentation.response;

import haengdong.event.application.response.EventDetailAppResponse;

public record EventDetailResponse(
        String eventName,
        String bankName,
        String accountNumber
) {

    public static EventDetailResponse of(EventDetailAppResponse response) {
        return new EventDetailResponse(response.eventName(), response.bankName(), response.accountNumber());
    }
}
