package haengdong.event.application.response;

import haengdong.user.domain.User;

public record UserAppResponse(
        String bankName,
        String accountNumber,
        Boolean isGuest
) {
    public static UserAppResponse of(User user) {
        return new UserAppResponse(user.getBank(), user.getAccountNumber(), user.isGuest());
    }
}
