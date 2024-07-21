package server.haengdong.application;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import server.haengdong.application.request.MemberActionSaveAppRequest;
import server.haengdong.application.request.MemberActionsSaveAppRequest;
import server.haengdong.domain.Action;
import server.haengdong.domain.MemberAction;
import server.haengdong.domain.MemberActionStatus;
import server.haengdong.domain.MemberGroupIdProvider;

@RequiredArgsConstructor
@Component
public class MemberActionFactory {

    private final MemberGroupIdProvider memberGroupIdProvider;

    public List<MemberAction> createMemberActions(
            MemberActionsSaveAppRequest request,
            List<MemberAction> memberActions,
            Action action
    ) {
        validateActions(request, memberActions);

        Long memberGroupId = memberGroupIdProvider.createGroupId();
        List<MemberAction> createdMemberActions = new ArrayList<>();
        List<MemberActionSaveAppRequest> actions = request.actions();
        for (MemberActionSaveAppRequest appRequest : actions) {
            MemberAction memberAction = appRequest.toMemberAction(action, memberGroupId);
            createdMemberActions.add(memberAction);
            action = action.next();
        }

        return createdMemberActions;
    }

    private void validateActions(MemberActionsSaveAppRequest request, List<MemberAction> memberActions) {
        List<MemberAction> reverseSortedMemberActions = memberActions.stream()
                .sorted(Comparator.comparing(MemberAction::getSequence).reversed())
                .toList();

        for (MemberActionSaveAppRequest action : request.actions()) {
            validateAction(action, reverseSortedMemberActions);
        }
    }

    private void validateAction(MemberActionSaveAppRequest request, List<MemberAction> memberActions) {
        MemberActionStatus memberActionStatus = MemberActionStatus.of(request.status());
        if (isInvalidStatus(memberActions, request.name(), memberActionStatus)) {
            throw new IllegalArgumentException();
        }
    }

    private boolean isInvalidStatus(List<MemberAction> actions, String name, MemberActionStatus status) {
        return actions.stream()
                .filter(action -> action.isSameName(name))
                .findFirst()
                .map(action -> action.isSameStatus(status))
                .orElse(MemberActionStatus.IN != status);
    }
}
