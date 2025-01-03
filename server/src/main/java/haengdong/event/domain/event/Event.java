package haengdong.event.domain.event;

import haengdong.common.domain.BaseEntity;
import haengdong.common.exception.HaengdongErrorCode;
import haengdong.common.exception.HaengdongException;
import haengdong.user.domain.AccountNumber;
import haengdong.user.domain.Bank;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE event SET deleted = true WHERE id = ?")
@SQLRestriction("deleted = false")
@Entity
public class Event extends BaseEntity {

    private static final int MIN_NAME_LENGTH = 1;
    private static final int MAX_NAME_LENGTH = 20;
    private static final String SPACES = "  ";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = MAX_NAME_LENGTH)
    private String name;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false)
    private Long userId;

    @Enumerated(EnumType.STRING)
    private Bank bank;

    @Embedded
    @AttributeOverride(name = "value", column = @Column(name = "accountNumber"))
    private AccountNumber accountNumber;

    private boolean deleted = Boolean.FALSE;

    private Event(String name, String token, Long userId, Bank bank, AccountNumber accountNumber) {
        validateName(name);
        this.name = name;
        this.token = token;
        this.userId = userId;
        this.bank = bank;
        this.accountNumber = accountNumber;
    }

    public static Event createByGuest(String name, String token, Long userId) {
        return new Event(name, token, userId, null, null);
    }

    public static Event createWithAccount(String name, String token, Long userId, Bank bank, AccountNumber accountNumber) {
        return new Event(name, token, userId, bank, accountNumber);
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

    public void rename(String name) {
        validateName(name);
        this.name = name;
    }

    public void changeAccount(String bankName, String accountNumber) {
        this.bank = Bank.of(bankName);
        this.accountNumber = new AccountNumber(accountNumber);
    }

    public boolean isNotHost(Long userId) {
        return !this.userId.equals(userId);
    }
}
