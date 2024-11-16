package server.haengdong.application.request;

import java.util.List;
import server.haengdong.domain.bill.Bill;
import server.haengdong.domain.eventmember.EventMember;
import server.haengdong.domain.event.Event;

public record BillAppRequest(
        String title,
        Long price,
        List<Long> memberIds
) {

    public Bill toBill(Event event, List<EventMember> eventMembers) {
        return Bill.create(event, title, price, eventMembers);
    }
}
