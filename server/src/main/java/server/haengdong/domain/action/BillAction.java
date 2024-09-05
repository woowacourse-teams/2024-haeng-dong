package server.haengdong.domain.action;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import server.haengdong.domain.event.Event;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class BillAction implements Comparable<BillAction> {

    public static final int MIN_TITLE_LENGTH = 1;
    public static final int MAX_TITLE_LENGTH = 30;
    public static final long MIN_PRICE = 1L;
    public static final long MAX_PRICE = 10_000_000L;
    private static final long DEFAULT_PRICE = 0L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Event event;

    @AttributeOverride(name = "value", column = @Column(name = "sequence"))
    @Embedded
    private Sequence sequence;

    @Column(length = MAX_TITLE_LENGTH)
    private String title;

    private Long price;

    @OneToMany(mappedBy = "billAction", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<BillActionDetail> billActionDetails = new ArrayList<>();

    public BillAction(Event event, Sequence sequence, String title, Long price) {
        validateTitle(title);
        validatePrice(price);
        this.event = event;
        this.sequence = sequence;
        this.title = title.trim();
        this.price = price;
    }

    private void validateTitle(String title) {
        int titleLength = title.trim().length();
        if (titleLength < MIN_TITLE_LENGTH || titleLength > MAX_TITLE_LENGTH) {
            throw new HaengdongException(HaengdongErrorCode.BILL_ACTION_TITLE_INVALID);
        }
    }

    private void validatePrice(Long price) {
        if (price < MIN_PRICE || price > MAX_PRICE) {
            throw new HaengdongException(HaengdongErrorCode.BILL_ACTION_PRICE_INVALID);
        }
    }

    public static BillAction create(
            Event event, Sequence sequence, String title, Long price, CurrentMembers currentMembers
    ) {
        BillAction billAction = new BillAction(event, sequence, title, price);
        billAction.resetBillActionDetails(currentMembers);
        return billAction;
    }

    public void resetBillActionDetails(CurrentMembers currentMembers) {
        this.billActionDetails.clear();
        Iterator<Long> priceIterator = distributePrice(currentMembers.size()).iterator();

        for (String member : currentMembers.getMembers()) {
            BillActionDetail billActionDetail = new BillActionDetail(this, member, priceIterator.next(), false);
            this.billActionDetails.add(billActionDetail);
        }
    }

    private void resetBillActionDetails() {
        Iterator<Long> priceIterator = distributePrice(billActionDetails.size()).iterator();

        billActionDetails.forEach(billActionDetail -> {
            billActionDetail.updatePrice(priceIterator.next());
            billActionDetail.updateIsFixed(false);
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

    public void update(String title, Long price) {
        validateTitle(title);
        validatePrice(price);
        this.title = title.trim();
        this.price = price;
        resetBillActionDetails();
    }

    public void addDetails(List<BillActionDetail> billActionDetails) {
        billActionDetails.forEach(this::addDetail);
    }

    private void addDetail(BillActionDetail billActionDetail) {
        this.billActionDetails.add(billActionDetail);
        billActionDetail.setBillAction(this);
    }

    public boolean isFixed() {
        return billActionDetails.stream()
                .anyMatch(BillActionDetail::isFixed);
    }

    public boolean isSamePrice(Long price) {
        return this.price.equals(price);
    }

    public Long findPriceByMemberName(String memberName) {
        return billActionDetails.stream()
                .filter(billActionDetail -> billActionDetail.hasMemberName(memberName))
                .map(BillActionDetail::getPrice)
                .findFirst()
                .orElseGet(() -> DEFAULT_PRICE);
    }

    @Override
    public int compareTo(BillAction o) {
        return sequence.compareTo(o.sequence);
    }
}
