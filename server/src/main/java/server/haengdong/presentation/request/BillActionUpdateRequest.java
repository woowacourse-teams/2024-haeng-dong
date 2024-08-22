package server.haengdong.presentation.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import server.haengdong.application.request.BillActionUpdateAppRequest;

public record BillActionUpdateRequest(

        @NotBlank(message = "지출 내역 제목은 공백일 수 없습니다.")
        String title,

        @NotNull(message = "지출 금액은 공백일 수 없습니다.")
        Long price
) {
    public BillActionUpdateAppRequest toAppResponse() {
        return new BillActionUpdateAppRequest(title, price);
    }
}
