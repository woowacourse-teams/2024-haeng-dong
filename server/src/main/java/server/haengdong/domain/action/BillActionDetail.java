package server.haengdong.domain.action;

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
public class BillActionDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private BillAction billAction;

    private String memberName;

    private Long price;

    private boolean isFixed;

    public BillActionDetail(BillAction billAction, String memberName, Long price, boolean isFixed) {
        this.billAction = billAction;
        this.memberName = memberName;
        this.price = price;
        this.isFixed = isFixed;
    }

    public void updatePrice(Long price) {
        this.price = price;
    }

    public void updateIsFixed(boolean isFixed) {
        this.isFixed = isFixed;
    }

    public void updateMemberName(String name) {
        this.memberName = name;
    }

    public boolean hasMemberName(String memberName) {
        return this.memberName.equals(memberName);
    }

    public boolean isSameName(String memberName) {
        return this.memberName.equals(memberName);
    }

    public void setBillAction(BillAction billAction) {
        this.billAction = billAction;
    }
}
