package server.haengdong.application.response;

import java.util.List;
import server.haengdong.domain.eventmember.EventMember;

public record MembersSaveAppResponse(
        List<MemberSaveAppResponse> members
) {

    public static MembersSaveAppResponse of(List<EventMember> eventMembers) {
        return new MembersSaveAppResponse(
                eventMembers.stream()
                        .map(MemberSaveAppResponse::of)
                        .toList()
        );
    }
}
