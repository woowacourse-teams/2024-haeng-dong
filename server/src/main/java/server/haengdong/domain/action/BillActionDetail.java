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

    public BillActionDetail(String memberName, Long price) {
        this.memberName = memberName;
        this.price = price;
    }

    public void setBillAction(BillAction billAction) {
        this.billAction = billAction;
    }

    public boolean hasMemberName(String memberName) {
        return this.memberName.equals(memberName);
    }
}
