package server.haengdong.application.request;

import java.util.List;

public record BillActionDetailsUpdateAppRequest(
        List<BillActionDetailUpdateAppRequest> billActionDetailUpdateAppRequests
) {
}
