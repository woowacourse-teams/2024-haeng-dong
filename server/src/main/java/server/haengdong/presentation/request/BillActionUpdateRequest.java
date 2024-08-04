package server.haengdong.presentation.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import server.haengdong.application.request.BillActionUpdateAppRequest;

public record BillActionUpdateRequest(

        @NotBlank
        String title,

        @NotNull
        Long price
) {
        public BillActionUpdateAppRequest toAppResponse() {
                return new BillActionUpdateAppRequest(title, price);
        }
}
