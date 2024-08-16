package server.haengdong.presentation.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import server.haengdong.application.request.BillActionDetailUpdateAppRequest;

public record BillActionDetailUpdateRequest(

        @NotBlank(message = "맴버 이름은 공백일 수 없습니다.")
        String name,

        @NotNull(message = "지출 금액은 공백일 수 없습니다.")
        Long price
) {
    public BillActionDetailUpdateAppRequest toAppRequest() {
        return new BillActionDetailUpdateAppRequest(this.name, this.price);
    }
}
