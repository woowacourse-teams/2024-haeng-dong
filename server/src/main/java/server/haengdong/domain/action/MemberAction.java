package server.haengdong.domain.action;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import server.haengdong.domain.event.Event;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"event_id", "sequence"})})
@Entity
public class MemberAction implements Comparable<MemberAction> {

    public static final int MIN_NAME_LENGTH = 1;
    public static final int MAX_NAME_LENGTH = 8;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "event_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Event event;

    @AttributeOverride(name = "value", column = @Column(name = "sequence", nullable = false))
    @Embedded
    private Sequence sequence;

    @Column(nullable = false, length = MAX_NAME_LENGTH)
    private String memberName;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private MemberActionStatus status;

    public MemberAction(Event event, Sequence sequence, String memberName, MemberActionStatus status) {
        validateMemberName(memberName);
        this.event = event;
        this.sequence = sequence;
        this.memberName = memberName;
        this.status = status;
    }

    private void validateMemberName(String memberName) {
        int memberLength = memberName.length();
        if (memberLength < MIN_NAME_LENGTH || memberLength > MAX_NAME_LENGTH) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_LENGTH_INVALID);
        }
    }

    public void updateMemberName(String memberName) {
        validateMemberName(memberName);
        this.memberName = memberName;
    }

    public boolean isIn() {
        return status == MemberActionStatus.IN;
    }

    public boolean isSameStatus(MemberActionStatus memberActionStatus) {
        return status == memberActionStatus;
    }

    @Override
    public int compareTo(MemberAction o) {
        return sequence.compareTo(o.sequence);
    }
}
