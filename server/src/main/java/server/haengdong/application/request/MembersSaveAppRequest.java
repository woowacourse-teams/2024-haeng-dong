package server.haengdong.application.request;

import java.util.List;

public record MembersSaveAppRequest(
        List<MemberSaveAppRequest> members
) {
}
