package server.haengdong.presentation.request;

import java.util.List;
import server.haengdong.application.request.MemberSaveAppRequest;
import server.haengdong.application.request.MembersSaveAppRequest;

public record MembersSaveRequest(
        List<MemberSaveRequest> members
) {

    public MembersSaveAppRequest toAppRequest() {
        return new MembersSaveAppRequest(members.stream()
                .map(member -> new MemberSaveAppRequest(member.name()))
                .toList());

    }
}
