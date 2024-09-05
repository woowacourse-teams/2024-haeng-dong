package server.haengdong.domain.action;

import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@EqualsAndHashCode
@Getter
@NoArgsConstructor
@Embeddable
public class Sequence implements Comparable<Sequence> {

    private static final long FIRST_SEQUENCE = 1L;

    private Long value;

    public Sequence(Long value) {
        this.value = value;
    }

    public static Sequence createFirst() {
        return new Sequence(FIRST_SEQUENCE);
    }

    public static Sequence getGreater(Sequence first, Sequence second) {
        if (first.compareTo(second) > 0) {
            return first;
        }
        return second;
    }

    public Sequence next() {
        return new Sequence(value + 1);
    }

    @Override
    public int compareTo(Sequence o) {
        return Long.compare(value, o.value);
    }
}
