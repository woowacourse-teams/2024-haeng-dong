package server.haengdong.presentation.response;

import server.haengdong.application.response.BillDetailAppResponse;

public record BillDetailResponse(
        Long id,
        String memberName,
        Long price,
        boolean isFixed
) {

    public static BillDetailResponse of(BillDetailAppResponse billDetailAppResponse) {
        return new BillDetailResponse(
                billDetailAppResponse.id(),
                billDetailAppResponse.memberName(),
                billDetailAppResponse.price(),
                billDetailAppResponse.isFixed()
        );
    }
}
