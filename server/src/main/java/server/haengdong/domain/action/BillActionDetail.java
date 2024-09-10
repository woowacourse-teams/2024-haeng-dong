package server.haengdong.domain.action;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
public class BillActionDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private BillAction billAction;

    @JoinColumn(name = "member_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @Column(nullable = false)
    private Long price;

    @Column(nullable = false)
    private boolean isFixed;

    public BillActionDetail(BillAction billAction, Member member, Long price, boolean isFixed) {
        this.billAction = billAction;
        this.member = member;
        this.price = price;
        this.isFixed = isFixed;
    }

    public void updatePrice(Long price) {
        this.price = price;
    }

    public void updateIsFixed(boolean isFixed) {
        this.isFixed = isFixed;
    }

    public boolean isMemberId(Long memberId) {
        return member.isId(memberId);
    }

    public boolean isMember(Member member) {
        return this.member.equals(member);
    }

    public void setBillAction(BillAction billAction) {
        this.billAction = billAction;
    }
}
