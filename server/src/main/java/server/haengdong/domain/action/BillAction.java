package server.haengdong.domain.action;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
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

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Action action;

    @Column(length = MAX_TITLE_LENGTH)
    private String title;

    private Long price;

    @OneToMany(mappedBy = "billAction", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<BillActionDetail> billActionDetails = new ArrayList<>();

    public BillAction(Action action, String title, Long price) {
        this(null, action, title, price);
    }

    private BillAction(Long id, Action action, String title, Long price) {
        validateTitle(title);
        validatePrice(price);
        this.id = id;
        this.action = action;
        this.title = title.trim();
        this.price = price;
    }

    public static BillAction create(Action action, String title, Long price, CurrentMembers currentMembers) {
        BillAction billAction = new BillAction(null, action, title, price);
        billAction.calculateTmp(currentMembers);
        return billAction;
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

    public void update(String title, Long price) {
        validateTitle(title);
        validatePrice(price);
        this.title = title;
        this.price = price;
    }

    public void calculateTmp(CurrentMembers currentMembers) {
        this.billActionDetails.clear();
        if (currentMembers.isNotEmpty()) {
            int currentMemberCount = currentMembers.size();
            long eachPrice = price / currentMemberCount;
            long remainder = price % currentMemberCount;
            this.billActionDetails.addAll(getBillActionDetails(
                    currentMembers,
                    eachPrice,
                    remainder
            ));
        }
    }

    private List<BillActionDetail> getBillActionDetails(
            CurrentMembers currentMembers,
            long eachPrice,
            long remainder
    ) {
        List<String> members = currentMembers.getMembers().stream().toList();
        List<BillActionDetail> billActionDetails = IntStream.range(0, members.size() - 1)
                .mapToObj(index -> new BillActionDetail(this, members.get(index), eachPrice, false))
                .collect(Collectors.toList());
        BillActionDetail lastBillActionDetail = new BillActionDetail(this, members.get(members.size() - 1),
                eachPrice + remainder, false);
        billActionDetails.add(lastBillActionDetail);

        return billActionDetails;
    }

    public boolean isSamePrice(Long price) {
        return this.price.equals(price);
    }

    public Long getSequence() {
        return action.getSequence();
    }

    public Event getEvent() {
        return action.getEvent();
    }

    public Long findPriceByMemberName(String memberName) {
        return billActionDetails.stream()
                .filter(billActionDetail -> billActionDetail.hasMemberName(memberName))
                .map(BillActionDetail::getPrice)
                .findFirst()
                .orElse(DEFAULT_PRICE);
    }

    public boolean isFixed() {
        return billActionDetails.stream()
                .map(BillActionDetail::getPrice)
                .distinct()
                .count() != 1L;
    }

    public void addDetails(List<BillActionDetail> billActionDetails) {
        billActionDetails.forEach(this::addDetail);
    }

    private void addDetail(BillActionDetail billActionDetail) {
        this.billActionDetails.add(billActionDetail);
        billActionDetail.setBillAction(this);
    }

    @Override
    public int compareTo(BillAction o) {
        return Long.compare(this.getSequence(), o.getSequence());
    }
}
