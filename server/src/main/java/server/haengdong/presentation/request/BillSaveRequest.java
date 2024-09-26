package server.haengdong.presentation.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import server.haengdong.application.request.BillAppRequest;

public record BillSaveRequest(

        @NotBlank(message = "지출 내역 제목은 공백일 수 없습니다.")
        String title,

        @NotNull(message = "지출 금액은 공백일 수 없습니다.")
        Long price,

        @NotEmpty
        List<Long> memberIds
) {

    public BillAppRequest toAppRequest() {
        return new BillAppRequest(title, price, memberIds);
    }
}
