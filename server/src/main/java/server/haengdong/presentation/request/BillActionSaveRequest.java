package server.haengdong.presentation.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import server.haengdong.application.request.BillActionAppRequest;

public record BillActionSaveRequest(

        @NotBlank
        String title,

        @NotNull
        Long price
) {

    public BillActionAppRequest toAppRequest() {
        return new BillActionAppRequest(title, price);
    }
}
