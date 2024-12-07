package haengdong.event.presentation.request;

import java.util.List;
import haengdong.event.application.request.MemberSaveAppRequest;
import haengdong.event.application.request.MembersSaveAppRequest;

public record MembersSaveRequest(
        List<MemberSaveRequest> members
) {

    public MembersSaveAppRequest toAppRequest() {
        return new MembersSaveAppRequest(members.stream()
                .map(member -> new MemberSaveAppRequest(member.name()))
                .toList());

    }
}
