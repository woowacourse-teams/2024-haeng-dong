package server.haengdong.domain.member;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

public class Members {

    private final Set<Member> members;

    public Members(List<Member> members) {
        validateNameUnique(members);
        validateMemberUnique(members);
        this.members = new HashSet<>(members);
    }

    private void validateNameUnique(List<Member> members) {
        List<String> memberNames = members.stream()
                .map(Member::getName)
                .toList();
        if (memberNames.size() != Set.copyOf(memberNames).size()) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_CHANGE_DUPLICATE);
        }
    }

    private void validateMemberUnique(List<Member> members) {
        if (members.size() != Set.copyOf(members).size()) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_CHANGE_DUPLICATE);
        }
    }

    public void validateUpdateAble(Members requestMembers) {
        validateUpdatedMembersExist(requestMembers);
        validateUpdatedNamesUnique(requestMembers);
    }

    private void validateUpdatedMembersExist(Members requestMembers) {
        if (!this.members.equals(requestMembers.members)) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_UPDATE_MISMATCH);
        }
    }

    private void validateUpdatedNamesUnique(Members requestMembers) {
        boolean duplicated = requestMembers.members.stream()
                .anyMatch(this::isMemberNameUpdated);

        if (duplicated) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_DUPLICATE);
        }
    }

    private boolean isMemberNameUpdated(Member updatedMember) {
        return this.members.stream()
                .filter(member -> !member.getId().equals(updatedMember.getId()))
                .anyMatch(member -> member.hasName(updatedMember.getName()));
    }

    public List<Member> getMembers() {
        return members.stream().toList();
    }
}


