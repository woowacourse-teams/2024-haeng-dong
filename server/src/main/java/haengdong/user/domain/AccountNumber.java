package haengdong.user.domain;

import haengdong.common.exception.HaengdongErrorCode;
import haengdong.common.exception.HaengdongException;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@EqualsAndHashCode
@Embeddable
public class AccountNumber {

    private static final int MIN_ACCOUNT_NUMBER_LENGTH = 8;
    private static final int MAX_ACCOUNT_NUMBER_LENGTH = 30;

    @Column(length = MAX_ACCOUNT_NUMBER_LENGTH)
    private String value;

    public AccountNumber(String value) {
        validateAccountNumber(value);
        this.value = value;
    }

    private void validateAccountNumber(String accountNumber) {
        int accountLength = accountNumber.trim().length();
        if (accountLength < MIN_ACCOUNT_NUMBER_LENGTH || MAX_ACCOUNT_NUMBER_LENGTH < accountLength) {
            throw new HaengdongException(
                    HaengdongErrorCode.ACCOUNT_LENGTH_INVALID, MIN_ACCOUNT_NUMBER_LENGTH, MAX_ACCOUNT_NUMBER_LENGTH);
        }
    }
}
