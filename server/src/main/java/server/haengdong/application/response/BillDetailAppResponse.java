package server.haengdong.application.response;

import server.haengdong.domain.action.BillDetail;

public record BillDetailAppResponse(
        Long id,
        String memberName,
        Long price,
        boolean isFixed
) {

    public static BillDetailAppResponse of(BillDetail billDetail) {
        return new BillDetailAppResponse(
                billDetail.getId(),
                billDetail.getMember().getName(),
                billDetail.getPrice(),
                billDetail.isFixed()
        );
    }
}
