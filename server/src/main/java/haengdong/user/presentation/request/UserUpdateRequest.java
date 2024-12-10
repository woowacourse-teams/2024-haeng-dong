package haengdong.user.presentation.request;

import haengdong.user.application.request.UserUpdateAppRequest;

public record UserUpdateRequest(
        String nickname,
        String bankName,
        String accountNumber
) {
    public UserUpdateAppRequest toAppRequest(Long userId) {
        return new UserUpdateAppRequest(userId, nickname, bankName, accountNumber);
    }
}
