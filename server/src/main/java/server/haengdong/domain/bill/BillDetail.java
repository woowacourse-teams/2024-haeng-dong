package server.haengdong.domain.bill;

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
import server.haengdong.domain.BaseEntity;
import server.haengdong.domain.eventmember.EventMember;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class BillDetail extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Bill bill;

    @JoinColumn(name = "member_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private EventMember eventMember;

    @Column(nullable = false)
    private Long price;

    @Column(nullable = false)
    private boolean isFixed;

    public BillDetail(Bill bill, EventMember eventMember, Long price, boolean isFixed) {
        this.bill = bill;
        this.eventMember = eventMember;
        this.price = price;
        this.isFixed = isFixed;
    }

    public void updatePrice(Long price) {
        this.price = price;
    }

    public void updateIsFixed(boolean isFixed) {
        this.isFixed = isFixed;
    }

    public boolean isSameId(Long id) {
        return this.id.equals(id);
    }

    public boolean isMember(EventMember eventMember) {
        return this.eventMember.equals(eventMember);
    }
}
