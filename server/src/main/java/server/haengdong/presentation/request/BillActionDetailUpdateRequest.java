package server.haengdong.presentation.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import server.haengdong.application.request.BillActionDetailUpdateAppRequest;

public record BillActionDetailUpdateRequest(

        @NotBlank(message = "맴버 이름은 공백일 수 없습니다.")
        Long memberId,

        @NotNull(message = "지출 금액은 공백일 수 없습니다.")
        Long price,

        @NotNull(message = "지출 금액은 공백일 수 없습니다.")
        boolean isFixed
) {
    public BillActionDetailUpdateAppRequest toAppRequest() {
        return new BillActionDetailUpdateAppRequest(this.memberId, this.price, this.isFixed);
    }
}
