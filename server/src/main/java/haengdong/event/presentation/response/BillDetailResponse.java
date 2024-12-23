package haengdong.event.presentation.response;

import haengdong.event.application.response.BillDetailAppResponse;

public record BillDetailResponse(
        Long id,
        String memberName,
        Long price,
        boolean isFixed
) {

    public static BillDetailResponse of(BillDetailAppResponse billDetailAppResponse) {
        return new BillDetailResponse(
                billDetailAppResponse.id(),
                billDetailAppResponse.memberName().getValue(),
                billDetailAppResponse.price(),
                billDetailAppResponse.isFixed()
        );
    }
}
