package server.haengdong.domain.bill;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import server.haengdong.domain.BaseEntity;
import server.haengdong.domain.member.Member;
import server.haengdong.domain.event.Event;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Bill extends BaseEntity {

    private static final int MIN_TITLE_LENGTH = 1;
    private static final int MAX_TITLE_LENGTH = 30;
    private static final long MIN_PRICE = 1L;
    private static final long MAX_PRICE = 10_000_000L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "event_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Event event;

    @Column(nullable = false, length = MAX_TITLE_LENGTH)
    private String title;

    @Column(nullable = false)
    private Long price;

    @OneToMany(mappedBy = "bill", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<BillDetail> billDetails = new ArrayList<>();

    public Bill(Event event, String title, Long price) {
        validateTitle(title);
        validatePrice(price);
        this.event = event;
        this.title = title.trim();
        this.price = price;
    }

    private void validateTitle(String title) {
        int titleLength = title.trim().length();
        if (titleLength < MIN_TITLE_LENGTH || titleLength > MAX_TITLE_LENGTH) {
            throw new HaengdongException(HaengdongErrorCode.BILL_TITLE_INVALID, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH);
        }
    }

    private void validatePrice(Long price) {
        if (price < MIN_PRICE || price > MAX_PRICE) {
            throw new HaengdongException(HaengdongErrorCode.BILL_PRICE_INVALID, MAX_PRICE);
        }
    }

    public static Bill create(Event event, String title, Long price, List<Member> members) {
        Bill bill = new Bill(event, title, price);
        bill.resetBillDetails(members);
        return bill;
    }

    public void resetBillDetails(List<Member> members) {
        this.billDetails.clear();
        Iterator<Long> priceIterator = distributePrice(members.size()).iterator();

        for (Member member : members) {
            BillDetail billDetail = new BillDetail(this, member, priceIterator.next(), false);
            this.billDetails.add(billDetail);
        }
    }

    private void resetBillDetails() {
        Iterator<Long> priceIterator = distributePrice(billDetails.size()).iterator();

        billDetails.forEach(billDetail -> {
            billDetail.updatePrice(priceIterator.next());
            billDetail.updateIsFixed(false);
        });
    }

    private List<Long> distributePrice(int memberCount) {
        if (memberCount == 0) {
            return new ArrayList<>();
        }
        long eachPrice = price / memberCount;
        long remainder = price % memberCount;

        List<Long> results = Stream.generate(() -> eachPrice)
                .limit(memberCount - 1)
                .collect(Collectors.toList());
        results.add(eachPrice + remainder);
        return results;
    }

    public void removeMemberBillDetail(Member member) {
        BillDetail foundBillDetail = billDetails.stream()
                .filter(billDetail -> billDetail.isMember(member))
                .findFirst()
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.MEMBER_NOT_FOUND));

        billDetails.remove(foundBillDetail);
        resetBillDetails();
    }

    public void update(String title, Long price) {
        validateTitle(title);
        validatePrice(price);
        this.title = title.trim();
        this.price = price;
        resetBillDetails();
    }

    public boolean containMember(Member member) {
        return billDetails.stream()
                .anyMatch(billDetail -> billDetail.isMember(member));
    }

    public boolean isSameMembers(Bill other) {
        Set<Member> members = Set.copyOf(this.getMembers());
        Set<Member> otherMembers = Set.copyOf(other.getMembers());

        return members.equals(otherMembers);
    }

    public boolean isSamePrice(Long price) {
        return this.price.equals(price);
    }

    public boolean isFixed() {
        return billDetails.stream()
                .anyMatch(BillDetail::isFixed);
    }

    public List<Member> getMembers() {
        return billDetails.stream()
                .map(BillDetail::getMember)
                .toList();
    }
}
