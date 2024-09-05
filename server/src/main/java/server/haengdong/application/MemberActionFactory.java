package server.haengdong.application;

import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import server.haengdong.application.request.MemberActionSaveAppRequest;
import server.haengdong.application.request.MemberActionsSaveAppRequest;
import server.haengdong.domain.action.CurrentMembers;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionStatus;
import server.haengdong.domain.action.Sequence;
import server.haengdong.domain.event.Event;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@RequiredArgsConstructor
@Component
public class MemberActionFactory {

    public List<MemberAction> createMemberActions(
            Event event,
            MemberActionsSaveAppRequest request,
            CurrentMembers currentMembers,
            Sequence sequence
    ) {
        validateMemberNames(request);
        validateActions(request, currentMembers);

        List<MemberAction> createdMemberActions = new ArrayList<>();
        List<MemberActionSaveAppRequest> actions = request.actions();
        for (MemberActionSaveAppRequest appRequest : actions) {
            MemberAction memberAction = appRequest.toMemberAction(event, sequence);
            createdMemberActions.add(memberAction);
            sequence = sequence.next();
        }

        return createdMemberActions;
    }

    private void validateMemberNames(MemberActionsSaveAppRequest request) {
        List<String> memberNames = request.actions().stream()
                .map(MemberActionSaveAppRequest::name)
                .toList();

        long uniqueCount = memberNames.stream().distinct().count();
        if (uniqueCount != memberNames.size()) {
            throw new HaengdongException(HaengdongErrorCode.MEMBER_NAME_DUPLICATE);
        }
    }

    private void validateActions(MemberActionsSaveAppRequest request, CurrentMembers currentMembers) {
        List<MemberActionSaveAppRequest> actions = request.actions();

        for (MemberActionSaveAppRequest action : actions) {
            MemberActionStatus memberActionStatus = MemberActionStatus.of(action.status());
            currentMembers.validate(action.name(), memberActionStatus);
        }
    }
}
