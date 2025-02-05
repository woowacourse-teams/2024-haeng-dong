package haengdong.event.domain.event.member;

import haengdong.user.domain.Nickname;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import haengdong.common.exception.HaengdongErrorCode;
import haengdong.common.exception.HaengdongException;

public class UpdatedMembers {

    private final Set<EventMember> eventMembers;

    public UpdatedMembers(List<EventMember> eventMembers) {
        validateMemberUnique(eventMembers);
        validateNameUnique(eventMembers);
        this.eventMembers = new HashSet<>(eventMembers);
    }

    private void validateMemberUnique(List<EventMember> eventMembers) {
        if (eventMembers.size() != Set.copyOf(eventMembers).size()) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_CHANGE_DUPLICATE);
        }
    }

    private void validateNameUnique(List<EventMember> eventMembers) {
        Set<Nickname> uniqueNames = eventMembers.stream()
                .map(EventMember::getName)
                .collect(Collectors.toSet());
        if (eventMembers.size() != uniqueNames.size()) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_CHANGE_DUPLICATE);
        }
    }

    public void validateUpdatable(List<EventMember> originEventMembers) {
        Set<EventMember> uniqueEventMembers = Set.copyOf(originEventMembers);
        validateUpdatedNamesUnique(uniqueEventMembers);
        validateId(uniqueEventMembers);
    }

    private void validateUpdatedNamesUnique(Set<EventMember> originEventMembers) {
        boolean duplicated = originEventMembers.stream()
                .anyMatch(this::isMemberNameUpdated);

        if (duplicated) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_DUPLICATE);
        }
    }

    private boolean isMemberNameUpdated(EventMember originMembers) {
        return this.eventMembers.stream()
                .filter(member -> !member.getId().equals(originMembers.getId()))
                .anyMatch(member -> member.hasName(originMembers.getName()));
    }

    private void validateId(Set<EventMember> originEventMembers) {
        boolean isNotCorrectId = this.eventMembers.stream()
                .anyMatch(member -> !originEventMembers.contains(member));

        if (isNotCorrectId) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NOT_FOUND);
        }
    }

    public List<EventMember> getMembers() {
        return eventMembers.stream().toList();
    }

    public boolean contain(EventMember eventMember) {
        return eventMembers.contains(eventMember);
    }
}


