package server.haengdong.presentation.request;

import jakarta.validation.Valid;
import java.util.List;
import server.haengdong.application.request.BillActionAppRequest;

public record BillActionsSaveRequest(@Valid List<BillActionSaveRequest> actions) {

    public List<BillActionAppRequest> toAppRequests() {
        return actions.stream()
                .map(BillActionSaveRequest::toAppRequest)
                .toList();
    }
}
