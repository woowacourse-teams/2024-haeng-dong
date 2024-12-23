package haengdong.event.presentation.request;

import haengdong.user.domain.Nickname;
import java.util.List;
import haengdong.event.application.request.MemberSaveAppRequest;
import haengdong.event.application.request.MembersSaveAppRequest;

public record MembersSaveRequest(
        List<MemberSaveRequest> members
) {

    public MembersSaveAppRequest toAppRequest() {
        return new MembersSaveAppRequest(members.stream()
                .map(member -> new MemberSaveAppRequest(new Nickname(member.name())))
                .toList());

    }
}
