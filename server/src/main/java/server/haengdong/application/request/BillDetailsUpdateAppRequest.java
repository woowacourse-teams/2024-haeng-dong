package server.haengdong.application.request;

import java.util.List;

public record BillDetailsUpdateAppRequest(
        List<BillDetailUpdateAppRequest> billDetailUpdateAppRequests
) {
}
