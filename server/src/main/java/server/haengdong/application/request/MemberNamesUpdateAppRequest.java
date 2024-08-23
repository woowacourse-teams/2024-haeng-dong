package server.haengdong.application.request;

import java.util.List;

public record MemberNamesUpdateAppRequest(
        List<MemberNameUpdateAppRequest> members
) {
}
