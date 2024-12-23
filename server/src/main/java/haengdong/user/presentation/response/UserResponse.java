package haengdong.user.presentation.response;

import haengdong.event.application.response.UserAppResponse;

public record UserResponse(
        String nickname,
        String bankName,
        String accountNumber,
        boolean isGuest,
        String profileImage
) {

    public static UserResponse of(UserAppResponse response) {
        return new UserResponse(
                response.nickname().getValue(), response.bankName().getName(), response.accountNumber().getValue(), response.isGuest(),
                response.profileImage()
        );
    }
}
