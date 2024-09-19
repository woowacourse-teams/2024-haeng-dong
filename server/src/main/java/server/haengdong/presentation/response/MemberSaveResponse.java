package server.haengdong.presentation.response;

import server.haengdong.application.response.MemberSaveAppResponse;

public record MemberSaveResponse(
        Long id,
        String name
) {
    public static MemberSaveResponse of(MemberSaveAppResponse response) {
        return new MemberSaveResponse(response.id(), response.name());
    }
}
