package server.haengdong.presentation.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import server.haengdong.application.request.BillAppRequest;

public record BillsSaveRequest(

        @Valid @NotEmpty List<BillSaveRequest> actions
) {

    public List<BillAppRequest> toAppRequests() {
        return actions.stream()
                .map(BillSaveRequest::toAppRequest)
                .toList();
    }
}
