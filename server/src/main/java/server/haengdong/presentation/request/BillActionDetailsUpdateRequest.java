package server.haengdong.presentation.request;

import jakarta.validation.Valid;
import java.util.List;
import server.haengdong.application.request.BillActionDetailsUpdateAppRequest;

public record BillActionDetailsUpdateRequest(
        @Valid List<BillActionDetailUpdateRequest> members
) {
    public BillActionDetailsUpdateAppRequest toAppRequest() {
        return new BillActionDetailsUpdateAppRequest(members.stream()
                .map(BillActionDetailUpdateRequest::toAppRequest)
                .toList());
    }
}
