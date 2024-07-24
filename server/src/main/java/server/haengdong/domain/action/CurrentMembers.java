package server.haengdong.domain.action;

import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class CurrentMembers {

    private final Set<String> members;

    public static CurrentMembers of(List<MemberAction> memberActions) {
        List<MemberAction> sortedMemberActions = getSortedMemberActions(memberActions);
        Set<String> members = new HashSet<>();
        for (MemberAction memberAction : sortedMemberActions) {
            String member = memberAction.getMemberName();
            if (memberAction.isSameStatus(MemberActionStatus.IN)) {
                members.add(member);
                continue;
            }
            members.remove(member);
        }

        return new CurrentMembers(members);
    }

    private static List<MemberAction> getSortedMemberActions(List<MemberAction> memberActions) {
        return memberActions.stream()
                .sorted(Comparator.comparing(MemberAction::getSequence))
                .toList();
    }
}
