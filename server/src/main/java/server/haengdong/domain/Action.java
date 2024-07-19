package server.haengdong.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Action {

    private static final long FIRST_SEQUENCE = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Event event;

    private Long sequence;

    public Action(Event event, Long sequence) {
        this.event = event;
        this.sequence = sequence;
    }

    public static Action createFirst(Event event) {
        return new Action(event, FIRST_SEQUENCE);
    }

    public Action next() {
        return new Action(event, sequence + 1);
    }
}
