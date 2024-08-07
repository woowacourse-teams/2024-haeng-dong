package server.haengdong.domain.action;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Action action;

    @Column(length = MAX_TITLE_LENGTH)
    private String title;

    private Long price;

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

    private void validateTitle(String title) {
        int titleLength = title.trim().length();
        if (titleLength < MIN_TITLE_LENGTH || titleLength > MAX_TITLE_LENGTH) {
            throw new HaengdongException(HaengdongErrorCode.BILL_ACTION_TITLE_INVALID,
                    String.format(HaengdongErrorCode.BILL_ACTION_TITLE_INVALID.getMessage(),
                            MIN_TITLE_LENGTH,
                            MAX_TITLE_LENGTH));
        }
    }

    private void validatePrice(Long price) {
        if (price < MIN_PRICE || price > MAX_PRICE) {
            throw new HaengdongException(HaengdongErrorCode.BILL_ACTION_PRICE_INVALID,
                    String.format(HaengdongErrorCode.BILL_ACTION_PRICE_INVALID.getMessage(), MAX_PRICE));
        }
    }

    public BillAction update(String title, Long price) {
        return new BillAction(id, action, title, price);
    }

    public Long getSequence() {
        return action.getSequence();
    }

    public Event getEvent() {
        return action.getEvent();
    }

    @Override
    public int compareTo(BillAction o) {
        return Long.compare(this.getSequence(), o.getSequence());
    }
}
