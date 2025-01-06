package haengdong.user.presentation.response;

import haengdong.event.application.response.UserAppResponse;
import haengdong.user.domain.AccountNumber;
import haengdong.user.domain.Bank;

public record UserResponse(
        String nickname,
        String bankName,
        String accountNumber,
        boolean isGuest,
        String profileImage
) {

    public static UserResponse of(UserAppResponse response) {
        Bank bank = response.bankName();
        AccountNumber accountedNumber = response.accountNumber();

        return new UserResponse(
                response.nickname().getValue(),
                bank == null ? "" : bank.getName(),
                accountedNumber == null ? "" : accountedNumber.getValue(),
                response.isGuest(),
                response.profileImage() == null ? "" : response.profileImage()
        );
    }
}
