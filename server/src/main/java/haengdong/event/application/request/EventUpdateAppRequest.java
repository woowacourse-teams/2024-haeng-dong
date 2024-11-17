package haengdong.event.application.request;

public record EventUpdateAppRequest(
        String eventName,
        String bankName,
        String accountNumber
) {

    public boolean isEventNameExist() {
        return eventName != null && !eventName.trim().isEmpty();
    }

    public boolean isAccountExist() {
        return bankName != null && !bankName.trim().isEmpty()
               && accountNumber != null && !accountNumber.trim().isEmpty();
    }
}
