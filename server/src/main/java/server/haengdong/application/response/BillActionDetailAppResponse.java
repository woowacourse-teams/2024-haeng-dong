package server.haengdong.application.response;

import server.haengdong.domain.action.BillActionDetail;

public record BillActionDetailAppResponse(
        String name,
        Long price,
        boolean isFixed
) {

    public static BillActionDetailAppResponse of(BillActionDetail billActionDetail) {
        return new BillActionDetailAppResponse(
                billActionDetail.getMember().getName(),
                billActionDetail.getPrice(),
                billActionDetail.isFixed()
        );
    }
}
