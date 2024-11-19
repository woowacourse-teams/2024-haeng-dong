package haengdong.user.domain;

import haengdong.event.domain.event.Password;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
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
    private static final int MIN_NICK_NAME_LENGTH = 1;
    private static final int MAX_NICK_NAME_LENGTH = 8;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nickname;

    @Embedded
    @AttributeOverride(name = "value", column = @Column(name = "password"))
    private Password password;

    private String bank;

    @Column(length = MAX_ACCOUNT_NUMBER_LENGTH)
    private String accountNumber;

    @Column(unique = true)
    private String memberNumber;

    private User(String nickname, String password, String bank, String accountNumber, String memberNumber) {
        this.nickname = nickname;
        this.password = new Password(password);
        this.bank = bank;
        this.accountNumber = accountNumber;
        this.memberNumber = memberNumber;
    }

    public static User createGuest(String nickName, String password) {
        return new User(nickName, password, "", "", "");
    }

    public static User createMember(String nickName, String memberNumber) {
        return new User(nickName, "0000", "", "", memberNumber);
    }

    public void changeNickname(String nickname) {
        validateNickname(nickname);
        this.nickname = nickname;
    }

    private void validateNickname(String nickname) {
        int nicknameLength = nickname.trim().length();
        if (nicknameLength < MIN_NICK_NAME_LENGTH || MAX_NICK_NAME_LENGTH < nicknameLength) {
            throw new HaengdongException(
                    HaengdongErrorCode.USER_NICK_NAME_LENGTH_INVALID, MIN_NICK_NAME_LENGTH, MAX_NICK_NAME_LENGTH);
        }
    }

    public void changeAccount(String bankName, String accountNumber) {
        validateBankName(bankName);
        validateAccountNumber(accountNumber);
        this.bank = bankName;
        this.accountNumber = accountNumber;
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

    public boolean isGuest() {
        return memberNumber == null || memberNumber.isBlank();
    }
}
