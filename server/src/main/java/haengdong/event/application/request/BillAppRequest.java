package haengdong.event.application.request;

import java.util.List;
import haengdong.event.domain.bill.Bill;
import haengdong.event.domain.event.member.EventMember;
import haengdong.event.domain.event.Event;

public record BillAppRequest(
        String title,
        Long price,
        List<Long> memberIds
) {

    public Bill toBill(Event event, List<EventMember> eventMembers) {
        return Bill.create(event, title, price, eventMembers);
    }
}
