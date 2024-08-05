package server.haengdong.presentation.response;

import java.util.List;
import server.haengdong.application.response.MembersAppResponse;

public record MembersResponse(
        List<String> memberNames
) {

    public static MembersResponse of(MembersAppResponse response) {
        return new MembersResponse(response.memberNames());
    }
}
