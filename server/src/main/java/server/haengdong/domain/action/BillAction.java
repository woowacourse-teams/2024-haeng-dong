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
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class BillAction implements Comparable<BillAction> {

    private static final int MIN_TITLE_LENGTH = 2;
    private static final int MAX_TITLE_LENGTH = 30;
    private static final long MIN_PRICE = 1L;
    private static final long MAX_PRICE = 10_000_000L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Action action;

    @Column(length = MAX_TITLE_LENGTH)
    private String title;

    private Long price;

    public BillAction(Action action, String title, Long price) {
        validateTitle(title);
        validatePrice(price);
        this.action = action;
        this.title = title.trim();
        this.price = price;
    }

    private void validateTitle(String title) {
        int titleLength = title.trim().length();
        if (titleLength < MIN_TITLE_LENGTH || titleLength > MAX_TITLE_LENGTH) {
            throw new HaengdongException(HaengdongErrorCode.INVALID_BILL_ACTION_SIZE);
        }
    }

    private void validatePrice(Long price) {
        if (price < MIN_PRICE || price > MAX_PRICE) {
            throw new HaengdongException(HaengdongErrorCode.INVALID_PRICE_SIZE);
        }
    }

    public Long getSequence() {
        return action.getSequence();
    }

    @Override
    public int compareTo(BillAction o) {
        return Long.compare(this.getSequence(), o.getSequence());
    }
}
