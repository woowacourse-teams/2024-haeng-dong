package haengdong.event.application.response;

import java.util.List;
import haengdong.event.domain.event.member.EventMember;

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
