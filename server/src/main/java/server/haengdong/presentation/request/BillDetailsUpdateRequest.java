package server.haengdong.presentation.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import server.haengdong.application.request.BillDetailsUpdateAppRequest;

public record BillDetailsUpdateRequest(

        @Valid
        @NotEmpty
        List<BillDetailUpdateRequest> billDetails
) {

    public BillDetailsUpdateAppRequest toAppRequest() {
        return new BillDetailsUpdateAppRequest(billDetails.stream()
                .map(BillDetailUpdateRequest::toAppRequest)
                .toList());
    }
}
