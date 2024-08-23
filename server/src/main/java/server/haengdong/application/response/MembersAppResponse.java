package server.haengdong.application.response;

import java.util.List;

public record MembersAppResponse(
        List<String> memberNames
) {
}
