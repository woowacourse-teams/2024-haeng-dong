package haengdong.event.application.response;

import haengdong.event.domain.bill.Bill;

public record BillAppResponse(
        Long id,
        String title,
        Long price,
        boolean isFixed
) {

    public static BillAppResponse of(Bill bill) {
        return new BillAppResponse(bill.getId(), bill.getTitle(), bill.getPrice(), bill.isFixed());
    }
}
