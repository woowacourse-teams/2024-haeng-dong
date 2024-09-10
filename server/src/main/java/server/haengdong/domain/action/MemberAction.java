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
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class MemberAction implements Comparable<MemberAction> {

    public static final int MIN_NAME_LENGTH = 1;
    public static final int MAX_NAME_LENGTH = 8;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "member_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @AttributeOverride(name = "value", column = @Column(name = "sequence", nullable = false))
    @Embedded
    private Sequence sequence;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private MemberActionStatus status;

    public MemberAction(Member member, Sequence sequence, MemberActionStatus status) {
        this.member = member;
        this.sequence = sequence;
        this.status = status;
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
