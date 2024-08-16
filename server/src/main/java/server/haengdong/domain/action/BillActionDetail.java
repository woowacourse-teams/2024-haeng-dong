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

    public BillActionDetail(Long id, BillAction billAction, String memberName, Long price) {
        this.id = id;
        this.billAction = billAction;
        this.memberName = memberName;
        this.price = price;
    }

    public BillActionDetail update(Long price) {
        return new BillActionDetail(id, billAction, memberName, price);
    }
}
