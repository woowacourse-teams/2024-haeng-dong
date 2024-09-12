package server.haengdong.domain.action;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.util.Objects;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import server.haengdong.domain.event.Event;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"event_id", "name"})})
@Entity
public class Member {

    public static final int MIN_NAME_LENGTH = 1;
    public static final int MAX_NAME_LENGTH = 8;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "event_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Event event;

    @Column(nullable = false, length = MAX_NAME_LENGTH)
    private String name;

    @Column(nullable = false)
    private boolean isDeposited;

    public Member(Event event, String name) {
        this(null, event, name, false);
    }

    public Member(Long id, Event event, String name, boolean isDeposited) {
        validateName(name);
        this.id = id;
        this.event = event;
        this.name = name;
        this.isDeposited = isDeposited;
    }

    public void updateName(String name) {
        validateName(name);
        this.name = name;
    }

    private void validateName(String name) {
        int nameLength = name.length();
        if (nameLength < MIN_NAME_LENGTH || nameLength > MAX_NAME_LENGTH) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_LENGTH_INVALID);
        }
    }

    public void updateDepositedStatus(boolean isDeposited) {
        this.isDeposited = isDeposited;
    }

    public boolean isId(Long memberId) {
        return id.equals(memberId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Member member = (Member) o;
        return Objects.equals(id, member.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
