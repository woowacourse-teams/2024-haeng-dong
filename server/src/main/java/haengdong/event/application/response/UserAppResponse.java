package haengdong.event.application.response;

import haengdong.user.domain.AccountNumber;
import haengdong.user.domain.Bank;
import haengdong.user.domain.Nickname;
import haengdong.user.domain.User;

public record UserAppResponse(
        Nickname nickname,
        Bank bankName,
        AccountNumber accountNumber,
        boolean isGuest,
        String profileImage
) {
    public static UserAppResponse of(User user) {
        return new UserAppResponse(user.getNickname(), user.getBank(), user.getAccountNumber(), user.isGuest(),
                user.getPicture()
        );
    }
}
