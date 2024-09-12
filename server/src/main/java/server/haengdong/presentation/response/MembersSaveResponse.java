package server.haengdong.presentation.response;

import java.util.List;
import server.haengdong.application.response.MemberSaveAppResponse;
import server.haengdong.application.response.MembersSaveAppResponse;

public record MembersSaveResponse(
        List<MemberSaveResponse> members
) {
    public static MembersSaveResponse of(MembersSaveAppResponse response) {
        return new MembersSaveResponse(
                response.members().stream()
                        .map(MemberSaveResponse::of)
                        .toList()
        );
    }
}
