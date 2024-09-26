package server.haengdong.presentation.response;

import server.haengdong.application.response.BillAppResponse;

public record BillResponse(
        Long id,
        String title,
        Long price,
        boolean isFixed
) {
    public static BillResponse of(BillAppResponse response) {
        return new BillResponse(response.id(), response.title(), response.price(), response.isFixed());
    }
}
