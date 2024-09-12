package server.haengdong.application.request;

import java.util.List;
import server.haengdong.domain.action.Bill;
import server.haengdong.domain.action.Member;
import server.haengdong.domain.event.Event;

public record BillAppRequest(
        String title,
        Long price,
        List<Long> memberIds
) {

    public Bill toBill(Event event, List<Member> members) {
        return Bill.create(event, title, price, members);
    }
}
