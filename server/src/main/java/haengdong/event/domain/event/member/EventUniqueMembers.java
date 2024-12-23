package haengdong.event.domain.event.member;

import haengdong.common.exception.HaengdongErrorCode;
import haengdong.common.exception.HaengdongException;
import haengdong.user.domain.Nickname;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class EventUniqueMembers {

    private final List<EventMember> eventMembers;

    public EventUniqueMembers(List<EventMember> eventMembers) {
        validateDuplicateName(eventMembers);
        this.eventMembers = eventMembers;
    }

    private void validateDuplicateName(List<EventMember> eventMembers) {
        Set<Nickname> uniqueNames = eventMembers.stream()
                .map(EventMember::getName)
                .distinct()
                .collect(Collectors.toSet());

        if (eventMembers.size() != uniqueNames.size()) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_DUPLICATE);
        }
    }

    public boolean containName(List<EventMember> others) {
        return others.stream()
                .anyMatch(this::containName);
    }

    private boolean containName(EventMember other) {
        return eventMembers.stream()
                .anyMatch(member -> member.isSameName(other));
    }
}
