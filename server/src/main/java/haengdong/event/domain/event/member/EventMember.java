package haengdong.event.domain.event.member;

import haengdong.common.domain.BaseEntity;
import haengdong.event.domain.event.Event;
import haengdong.user.domain.Nickname;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
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

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"event_id", "name"})})
@Entity
public class EventMember extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "event_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Event event;

    @Embedded
    @AttributeOverride(name = "value", column = @Column(name = "name"))
    private Nickname name;

    @Column(nullable = false)
    private boolean isDeposited;

    public EventMember(Event event, Nickname name) {
        this(null, event, name, false);
    }

    public EventMember(Event event, String name) {
        this(null, event, new Nickname(name), false);
    }

    public EventMember(Long id, Event event, Nickname name, boolean isDeposited) {
        this.id = id;
        this.event = event;
        this.name = name;
        this.isDeposited = isDeposited;
    }

    public EventMember(Long id, Event event, String name, boolean isDeposited) {
        this(id, event, new Nickname(name), isDeposited);
    }

    public static EventMember createHost(Event event, Nickname name) {
        return new EventMember(null, event, name, true);
    }

    public boolean hasName(Nickname name) {
        return this.name.equals(name);
    }

    public boolean isSameName(EventMember other) {
        return this.name.equals(other.name);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        EventMember eventMember = (EventMember) o;
        return Objects.equals(id, eventMember.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
