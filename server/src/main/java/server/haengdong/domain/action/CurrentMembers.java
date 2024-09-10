package server.haengdong.domain.action;

import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

public class CurrentMembers {

    private final Set<Member> members;

    public CurrentMembers() {
        this(new HashSet<>());
    }

    protected CurrentMembers(Set<Member> members) {
        this.members = members;
    }

    public static CurrentMembers of(List<MemberAction> memberActions) {
        List<MemberAction> sortedMemberActions = getSortedMemberActions(memberActions);
        Set<Member> members = new HashSet<>();
        for (MemberAction memberAction : sortedMemberActions) {
            Member member = memberAction.getMember();
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
        Member member = memberAction.getMember();

        Set<Member> currentMembers = new HashSet<>(members);

        if (memberAction.isIn()) {
            currentMembers.add(member);
        } else {
            currentMembers.remove(member);
        }
        return new CurrentMembers(currentMembers);
    }

    public void validate(Member member, MemberActionStatus memberActionStatus) {
        if (memberActionStatus == MemberActionStatus.IN && members.contains(member)) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_ALREADY_EXIST);
        }
        if (memberActionStatus == MemberActionStatus.OUT && !members.contains(member)) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NOT_EXIST);
        }
    }

    public boolean isEmpty() {
        return members.isEmpty();
    }

    public boolean isNotEmpty() {
        return !members.isEmpty();
    }

    public int size() {
        return members.size();
    }

    public Set<Member> getMembers() {
        return Collections.unmodifiableSet(members);
    }
}
