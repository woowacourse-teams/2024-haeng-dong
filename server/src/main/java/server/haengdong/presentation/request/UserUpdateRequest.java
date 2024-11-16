package server.haengdong.presentation.request;

import server.haengdong.application.request.UserUpdateAppRequest;

public record UserUpdateRequest(
        String nickname,
        String bankName,
        String accountNumber
) {
    public UserUpdateAppRequest toAppRequest(Long userId) {
        return new UserUpdateAppRequest(userId, nickname, bankName, accountNumber);
    }
}
