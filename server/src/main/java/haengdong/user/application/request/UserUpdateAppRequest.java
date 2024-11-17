package haengdong.user.application.request;

public record UserUpdateAppRequest(
        Long id,
        String nickname,
        String bankName,
        String accountNumber
) {
    public boolean isNicknameExist() {
        return nickname != null && !nickname.isBlank();
    }

    public boolean isAccountExist() {
        return accountNumber != null && !accountNumber.isBlank()
                && bankName != null && !bankName.isBlank();
    }
}
