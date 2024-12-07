package haengdong.event.presentation.response;

import java.util.List;
import haengdong.event.application.response.MembersSaveAppResponse;

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
