package server.haengdong.application.response;

import java.util.List;
import server.haengdong.domain.action.Member;

public record MembersAppResponse(
        List<String> memberNames
) {

    public static MembersAppResponse of(List<Member> members) {
        List<String> memberNames = members.stream()
                .map(Member::getName)
                .toList();

        return new MembersAppResponse(memberNames);
    }
}
