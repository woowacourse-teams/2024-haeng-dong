package server.haengdong.application.request;

import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.CurrentMembers;
import server.haengdong.domain.action.Sequence;
import server.haengdong.domain.event.Event;

public record BillActionAppRequest(
        String title,
        Long price
) {

    public BillAction toBillAction(Event event, Sequence sequence, CurrentMembers currentMembers) {
        return BillAction.create(event, sequence, title, price, currentMembers);
    }
}
