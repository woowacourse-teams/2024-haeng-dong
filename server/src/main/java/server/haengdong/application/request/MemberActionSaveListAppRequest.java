package server.haengdong.application.request;

import java.util.List;
import server.haengdong.domain.MemberAction;

public record MemberActionSaveListAppRequest(List<MemberActionSaveAppRequest> actions, Long sequence) {

    public List<MemberAction> toMemberActionList(Long memberGroupId) {
        return actions.stream()
                .map(action -> action.toMemberAction(memberGroupId))
                .toList();

    }
}
