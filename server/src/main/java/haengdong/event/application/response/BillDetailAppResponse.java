package haengdong.event.application.response;

import haengdong.event.domain.bill.BillDetail;
import haengdong.user.domain.Nickname;

public record BillDetailAppResponse(
        Long id,
        Nickname memberName,
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
