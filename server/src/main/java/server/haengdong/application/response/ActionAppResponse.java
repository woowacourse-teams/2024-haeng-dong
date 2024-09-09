package server.haengdong.application.response;

import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionStatus;

public record ActionAppResponse(
        Long actionId,
        String name,
        Long price,
        Long sequence,
        boolean isFixed,
        ActionType actionType
) {

    public ActionAppResponse(Long actionId, String name, Long price, Long sequence, ActionType actionType) {
        this(actionId, name, price, sequence, false, actionType);
    }

    public static ActionAppResponse of(BillAction billAction) {
        return new ActionAppResponse(
                billAction.getId(),
                billAction.getTitle(),
                billAction.getPrice(),
                billAction.getSequence().getValue(),
                billAction.isFixed(),
                ActionAppResponse.ActionType.BILL
        );
    }

    public static ActionAppResponse of(MemberAction memberAction) {
        MemberActionStatus status = memberAction.getStatus();

        return new ActionAppResponse(
                memberAction.getId(),
                memberAction.getMemberName(),
                null,
                memberAction.getSequence().getValue(),
                false,
                ActionAppResponse.ActionType.of(status)
        );
    }

    public String actionTypeName() {
        return actionType.name();
    }

    public enum ActionType {
        BILL,
        IN,
        OUT,
        ;

        private static ActionType of(MemberActionStatus memberActionStatus) {
            if (MemberActionStatus.IN == memberActionStatus) {
                return IN;
            }
            return OUT;
        }
    }
}
