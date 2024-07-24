package server.haengdong.presentation.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import server.haengdong.application.request.BillActionAppRequest;

public record BillActionSaveRequest(

        @NotEmpty
        String title,

        @NotNull
        Long price
) {

    public BillActionAppRequest toAppRequest() {
        return new BillActionAppRequest(title, price);
    }
}
