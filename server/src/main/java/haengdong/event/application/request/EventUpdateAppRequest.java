package haengdong.event.application.request;

public record EventUpdateAppRequest(
        String eventName,
        String bankName,
        String accountNumber
) {
    public boolean isEventNameExist() {
        return eventName != null && !eventName.isBlank();
    }

    public boolean isAccountExist() {
        return accountNumber != null && !accountNumber.isBlank()
               && bankName != null && !bankName.isBlank();
    }
}
