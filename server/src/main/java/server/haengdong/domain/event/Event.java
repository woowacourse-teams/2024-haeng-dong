package server.haengdong.domain.event;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Event {

    public static final int MIN_NAME_LENGTH = 1;
    public static final int MAX_NAME_LENGTH = 20;
    public static final int MIN_ACCOUNT_NUMBER_LENGTH = 8;
    public static final int MAX_ACCOUNT_NUMBER_LENGTH = 30;
    private static final String SPACES = "  ";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = MAX_NAME_LENGTH)
    private String name;

    @Embedded
    @AttributeOverride(name = "value", column = @Column(name = "password", nullable = false))
    private Password password;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(length = MAX_ACCOUNT_NUMBER_LENGTH)
    private String account;


    public Event(String name, String password, String token) {
        validateName(name);
        this.name = name;
        this.password = new Password(password);
        this.token = token;
        this.account = "";
    }

    private void validateName(String name) {
        int nameLength = name.trim().length();
        if (nameLength < MIN_NAME_LENGTH || MAX_NAME_LENGTH < nameLength) {
            throw new HaengdongException(HaengdongErrorCode.EVENT_NAME_LENGTH_INVALID);
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
            throw new HaengdongException(HaengdongErrorCode.ACCOUNT_LENGTH_INVALID);
        }
    }
}
