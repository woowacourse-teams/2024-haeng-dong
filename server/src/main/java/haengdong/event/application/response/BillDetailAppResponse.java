package haengdong.event.application.response;

import haengdong.event.domain.bill.BillDetail;

public record BillDetailAppResponse(
        Long id,
        String memberName,
        Long price,
        boolean isFixed
) {

    public static BillDetailAppResponse of(BillDetail billDetail) {
        return new BillDetailAppResponse(
                billDetail.getId(),
                billDetail.getEventMember().getName(),
                billDetail.getPrice(),
                billDetail.isFixed()
        );
    }
}
