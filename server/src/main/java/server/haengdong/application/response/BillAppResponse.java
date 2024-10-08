package server.haengdong.application.response;

import server.haengdong.domain.bill.Bill;

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
