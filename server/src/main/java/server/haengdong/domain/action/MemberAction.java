package server.haengdong.domain.action;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class MemberAction implements Comparable<MemberAction> {

    public static final int MIN_NAME_LENGTH = 1;
    public static final int MAX_NAME_LENGTH = 4;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Action action;

    private String memberName;

    @Enumerated(EnumType.STRING)
    private MemberActionStatus status;

    private Long memberGroupId;

    public MemberAction(Action action, String memberName, MemberActionStatus status, Long memberGroupId) {
        validateMemberName(memberName);
        this.action = action;
        this.memberName = memberName;
        this.status = status;
        this.memberGroupId = memberGroupId;
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

    public Long getSequence() {
        return action.getSequence();
    }

    @Override
    public int compareTo(MemberAction o) {
        return Long.compare(this.getSequence(), o.getSequence());
    }
}
