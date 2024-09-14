package server.haengdong.application.request;

public record EventUpdateAppRequest(String eventName, String bankName, String accountNumber) {

    public boolean isEventNameExist() {
        return !eventName.trim().isEmpty();
    }

    public boolean isAccountExist() {
        return !bankName.trim().isEmpty() && !accountNumber.trim().isEmpty();
    }
}
