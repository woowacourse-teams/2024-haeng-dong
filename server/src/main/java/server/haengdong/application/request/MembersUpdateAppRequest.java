package server.haengdong.application.request;

import java.util.List;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.member.Member;

public record MembersUpdateAppRequest(List<MemberUpdateAppRequest> members) {

    public List<Member> toMembers(Event event) {
        return members.stream()
                .map(memberRequest -> memberRequest.toMember(event))
                .toList();
    }
}
