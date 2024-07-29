package server.haengdong.domain.action;

import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class CurrentMembers {

    private final Set<String> members;

    public CurrentMembers() {
        this(new HashSet<>());
    }

    private CurrentMembers(Set<String> members) {
        this.members = members;
    }

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

    public CurrentMembers addMemberAction(MemberAction memberAction) {
        String memberName = memberAction.getMemberName();

        Set<String> currentMembers = new HashSet<>(members);

        if (memberAction.isIn()) {
            currentMembers.add(memberName);
        } else {
            currentMembers.remove(memberName);
        }
        return new CurrentMembers(currentMembers);
    }

    public boolean isEmpty() {
        return members.isEmpty();
    }

    public int size() {
        return members.size();
    }

    public Set<String> getMembers() {
        return Collections.unmodifiableSet(members);
    }
}
