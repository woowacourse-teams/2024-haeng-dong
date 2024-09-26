package server.haengdong.domain.member;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

public class UpdatedMembers {

    private final Set<Member> members;

    public UpdatedMembers(List<Member> members) {
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

    public void validateUpdateAble(List<Member> members) {
        Set<Member> uniqueMembers = Set.copyOf(members);
        validateUpdatedMembersExist(uniqueMembers);
        validateUpdatedNamesUnique(uniqueMembers);
    }

    private void validateUpdatedMembersExist(Set<Member> members) {
        if (!this.members.equals(members)) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_UPDATE_MISMATCH);
        }
    }

    private void validateUpdatedNamesUnique(Set<Member> members) {
        boolean duplicated = members.stream()
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


