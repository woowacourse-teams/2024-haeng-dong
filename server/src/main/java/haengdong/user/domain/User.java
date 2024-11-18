package haengdong.user.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import haengdong.common.domain.BaseEntity;
import haengdong.common.exception.HaengdongErrorCode;
import haengdong.common.exception.HaengdongException;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "users")
@Entity
public class User extends BaseEntity {

    private static final int MIN_ACCOUNT_NUMBER_LENGTH = 8;
    private static final int MAX_ACCOUNT_NUMBER_LENGTH = 30;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nickname;

    private String password;

    private String bank;

    @Column(length = MAX_ACCOUNT_NUMBER_LENGTH)
    private String accountNumber;

    @Column(unique = true)
    private String memberNumber;

    private User(String nickname, String password, String bank, String accountNumber, String memberNumber) {
        this.nickname = nickname;
        this.password = password;
        this.bank = bank;
        this.accountNumber = accountNumber;
        this.memberNumber = memberNumber;
    }

    public static User createGuest(String nickName, String password) {
        return new User(nickName, password, null, null, null);
    }

    public static User createMember(String nickName, String memberNumber) {
        return new User(nickName, null, null, null, memberNumber);
    }

    public void changeNickname(String nickname) {
        this.nickname = nickname;
    }

    public void changeAccount(String bankName, String accountNumber) {
        validateBankName(bankName);
        validateAccountNumber(accountNumber);
    }

    private void validateBankName(String bankName) {
        Bank.isExists(bankName);
    }

    private void validateAccountNumber(String accountNumber) {
        int accountLength = accountNumber.trim().length();
        if (accountLength < MIN_ACCOUNT_NUMBER_LENGTH || MAX_ACCOUNT_NUMBER_LENGTH < accountLength) {
            throw new HaengdongException(
                    HaengdongErrorCode.ACCOUNT_LENGTH_INVALID, MIN_ACCOUNT_NUMBER_LENGTH, MAX_ACCOUNT_NUMBER_LENGTH);
        }
    }

    public boolean isPasswordMismatch(String rawPassword) {
        return !password.matches(rawPassword);
    }
}
