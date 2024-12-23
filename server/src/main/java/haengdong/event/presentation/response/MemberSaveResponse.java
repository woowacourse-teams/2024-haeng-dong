package haengdong.event.presentation.response;

import haengdong.event.application.response.MemberSaveAppResponse;

public record MemberSaveResponse(
        Long id,
        String name
) {

    public static MemberSaveResponse of(MemberSaveAppResponse response) {
        return new MemberSaveResponse(response.id(), response.name().getValue());
    }
}
