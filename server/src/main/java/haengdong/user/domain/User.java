package haengdong.user.domain;

import haengdong.common.domain.BaseEntity;
import haengdong.event.domain.event.Password;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "users")
@Entity
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    @AttributeOverride(name = "value", column = @Column(name = "nickname"))
    private Nickname nickname;

    @Embedded
    @AttributeOverride(name = "value", column = @Column(name = "password"))
    private Password password;

    @Enumerated(EnumType.STRING)
    private Bank bank;

    @Embedded
    @AttributeOverride(name = "value", column = @Column(name = "accountNumber"))
    private AccountNumber accountNumber;

    @Column(unique = true)
    private String memberNumber;

    private String picture;

    private User(String nickname, String password, Bank bank, AccountNumber accountNumber, String memberNumber, String picture) {
        this.nickname = new Nickname(nickname);
        this.password = new Password(password);
        this.bank = bank;
        this.accountNumber = accountNumber;
        this.memberNumber = memberNumber;
        this.picture = picture;
    }

    public static User createGuest(String nickName, String password) {
        return new User(nickName, password, null, null, null, null);
    }

    public static User createMember(String nickName, String memberNumber, String picture) {
        if (nickName.length() > Nickname.MAX_NAME_LENGTH) {
            nickName = nickName.substring(0, Nickname.MAX_NAME_LENGTH);
        }
        return new User(nickName, "0000", null, null, memberNumber, picture);
    }

    public void changeNickname(String nickname) {
        this.nickname = new Nickname(nickname);
    }

    public void changeAccount(String bankName, String accountNumber) {
        this.bank = Bank.of(bankName);
        this.accountNumber = new AccountNumber(accountNumber);
    }

    public boolean isPasswordMismatch(String rawPassword) {
        return !password.matches(rawPassword);
    }

    public boolean isGuest() {
        return memberNumber == null || memberNumber.isBlank();
    }
}
