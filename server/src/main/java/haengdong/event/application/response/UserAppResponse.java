package haengdong.event.application.response;

import haengdong.user.domain.User;

public record UserAppResponse(
        String nickname,
        String bankName,
        String accountNumber,
        boolean isGuest,
        String profileImage
) {
    public static UserAppResponse of(User user) {
        return new UserAppResponse(user.getNickname(), user.getBank(), user.getAccountNumber(), user.isGuest(),
                user.getPicture()
        );
    }
}
