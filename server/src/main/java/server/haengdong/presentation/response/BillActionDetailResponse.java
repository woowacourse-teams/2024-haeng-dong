package server.haengdong.presentation.response;

import server.haengdong.application.response.BillActionDetailAppResponse;

public record BillActionDetailResponse(
        String name,
        Long price
) {

    public static BillActionDetailResponse of(BillActionDetailAppResponse billActionDetailAppResponse) {
        return new BillActionDetailResponse(billActionDetailAppResponse.name(), billActionDetailAppResponse.price());
    }
}
