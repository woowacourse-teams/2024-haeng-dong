package server.haengdong.application.request;

import server.haengdong.domain.action.Action;
import server.haengdong.domain.action.BillAction;

public record BillActionAppRequest(
        String title,
        Long price
) {

    public BillAction toBillAction(Action action) {
        return new BillAction(action, title, price);
    }
}
