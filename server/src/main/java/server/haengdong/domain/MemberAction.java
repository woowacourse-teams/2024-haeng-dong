package server.haengdong.domain;

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

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class MemberAction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    private Action action;

    private String memberName;

    @Enumerated(EnumType.STRING)
    private MemberActionStatus status;

    private Long memberGroupId;

    public MemberAction(Action action, String memberName, MemberActionStatus status, Long memberGroupId) {
        this.action = action;
        this.memberName = memberName;
        this.status = status;
        this.memberGroupId = memberGroupId;
    }
}
