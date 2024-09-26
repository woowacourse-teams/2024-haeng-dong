package server.haengdong.domain.member;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

public class UpdatedMembers {

    private final Set<Member> members;

    public UpdatedMembers(List<Member> members) {
        validateMemberUnique(members);
        validateNameUnique(members);
        this.members = new HashSet<>(members);
    }

    private void validateMemberUnique(List<Member> members) {
        if (members.size() != Set.copyOf(members).size()) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_CHANGE_DUPLICATE);
        }
    }

    private void validateNameUnique(List<Member> members) {
        Set<String> uniqueNames = members.stream()
                .map(Member::getName)
                .collect(Collectors.toSet());
        if (members.size() != uniqueNames.size()) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_CHANGE_DUPLICATE);
        }
    }

    public void validateUpdatable(List<Member> originMembers) {
        Set<Member> uniqueMembers = Set.copyOf(originMembers);
        validateUpdatedMembersExist(uniqueMembers);
        validateUpdatedNamesUnique(uniqueMembers);
    }

    private void validateUpdatedMembersExist(Set<Member> originMembers) {
        if (!this.members.equals(originMembers)) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_UPDATE_MISMATCH);
        }
    }

    private void validateUpdatedNamesUnique(Set<Member> originMembers) {
        boolean duplicated = originMembers.stream()
                .anyMatch(this::isMemberNameUpdated);

        if (duplicated) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_DUPLICATE);
        }
    }

    private boolean isMemberNameUpdated(Member originMembers) {
        return this.members.stream()
                .filter(member -> !member.getId().equals(originMembers.getId()))
                .anyMatch(member -> member.hasName(originMembers.getName()));
    }

    public List<Member> getMembers() {
        return members.stream().toList();
    }
}


