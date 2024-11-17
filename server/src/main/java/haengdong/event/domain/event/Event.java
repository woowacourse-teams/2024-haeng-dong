package haengdong.event.domain.event;

import haengdong.user.domain.Bank;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.Arrays;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import haengdong.common.domain.BaseEntity;
import haengdong.common.exception.HaengdongErrorCode;
import haengdong.common.exception.HaengdongException;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Event extends BaseEntity {

    private static final int MIN_NAME_LENGTH = 1;
    private static final int MAX_NAME_LENGTH = 20;
    private static final int MIN_ACCOUNT_NUMBER_LENGTH = 8;
    private static final int MAX_ACCOUNT_NUMBER_LENGTH = 30;
    private static final String SPACES = "  ";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = MAX_NAME_LENGTH)
    private String name;

    @Embedded
    @AttributeOverride(name = "value", column = @Column(name = "password"))
    private Password password;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(length = MAX_ACCOUNT_NUMBER_LENGTH)
    private String account;

    @Column(nullable = false)
    private Long userId;

    public Event(String name, String password, String token) {
        validateName(name);
        this.name = name;
        this.password = new Password(password);
        this.token = token;
        this.account = "";
        this.userId = 0L;
    }

    public Event(String name, Long userId, String token) {
        validateName(name);
        this.name = name;
        this.userId = userId;
        this.token = token;
    }

    private void validateName(String name) {
        int nameLength = name.trim().length();
        if (nameLength < MIN_NAME_LENGTH || MAX_NAME_LENGTH < nameLength) {
            throw new HaengdongException(
                    HaengdongErrorCode.EVENT_NAME_LENGTH_INVALID, MIN_NAME_LENGTH, MAX_NAME_LENGTH);
        }
        if (isBlankContinuous(name)) {
            throw new HaengdongException(HaengdongErrorCode.EVENT_NAME_CONSECUTIVE_SPACES);
        }
    }

    private boolean isBlankContinuous(String name) {
        return name.contains(SPACES);
    }

    public boolean isTokenMismatch(String token) {
        return !this.token.equals(token);
    }

    public boolean isPasswordMismatch(String rawPassword) {
        return !password.matches(rawPassword);
    }

    public void rename(String name) {
        validateName(name);
        this.name = name;
    }

    public void changeAccount(String bankName, String accountNumber) {
        validateBankName(bankName);
        validateAccountNumber(accountNumber);
        this.account = bankName + " " + accountNumber;
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

    public String getBankName() {
        String[] bankNameAndAccountNumber = account.split(" ");
        if (bankNameAndAccountNumber.length > 0) {
            return bankNameAndAccountNumber[0];
        }
        return "";
    }

    public String getAccountNumber() {
        String[] bankNameAndAccountNumber = account.split(" ");
        if (bankNameAndAccountNumber.length > 1) {
            return String.join(" ", Arrays.copyOfRange(bankNameAndAccountNumber, 1, bankNameAndAccountNumber.length));
        }
        return "";
    }
}
