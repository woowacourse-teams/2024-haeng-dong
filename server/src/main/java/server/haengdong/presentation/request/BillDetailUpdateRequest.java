package server.haengdong.presentation.request;

import jakarta.validation.constraints.NotNull;
import server.haengdong.application.request.BillDetailUpdateAppRequest;

public record BillDetailUpdateRequest(

        @NotNull(message = "지출 상세 ID는 공백일 수 없습니다.")
        Long id,

        @NotNull(message = "지출 금액은 공백일 수 없습니다.")
        Long price,

        boolean isFixed
) {
    public BillDetailUpdateAppRequest toAppRequest() {
        return new BillDetailUpdateAppRequest(this.id, this.price, this.isFixed);
    }
}
