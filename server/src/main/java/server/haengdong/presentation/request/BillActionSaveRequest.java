package server.haengdong.presentation.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import server.haengdong.application.request.BillActionAppRequest;

public record BillActionSaveRequest(

        @NotNull
        @Size(min = 2, max = 30)
        String title,

        @NotNull
        @Positive
        Long price
) {

    public BillActionAppRequest toAppRequest() {
        return new BillActionAppRequest(title, price);
    }
}
