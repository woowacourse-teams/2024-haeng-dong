package server.haengdong.application.request;

import server.haengdong.domain.action.Action;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.CurrentMembers;

public record BillActionAppRequest(
        String title,
        Long price
) {

    public BillAction toBillAction(Action action, CurrentMembers currentMembers) {
        return BillAction.create(action, title, price, currentMembers);
    }
}
