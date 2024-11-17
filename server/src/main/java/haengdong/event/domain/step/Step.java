package haengdong.event.domain.step;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import haengdong.event.domain.bill.Bill;
import haengdong.event.domain.event.member.EventMember;
import haengdong.common.exception.HaengdongErrorCode;
import haengdong.common.exception.HaengdongException;

public class Step {

    private final List<Bill> bills;
    private final Set<EventMember> eventMembers;

    private Step(List<Bill> bills, Set<EventMember> eventMembers) {
        this.bills = bills;
        this.eventMembers = eventMembers;
    }

    public static Step of(Bill bill) {
        List<Bill> bills = new ArrayList<>();
        bills.add(bill);
        Set<EventMember> eventMembers = new HashSet<>(bill.getMembers());

        return new Step(bills, eventMembers);
    }

    public void add(Bill bill) {
        if (isNotSameMember(bill)) {
            throw new HaengdongException(HaengdongErrorCode.DIFFERENT_STEP_MEMBERS);
        }

        bills.add(bill);
    }

    public boolean isNotSameMember(Bill bill) {
        Set<EventMember> otherEventMembers = Set.copyOf(bill.getMembers());
        return !eventMembers.equals(otherEventMembers);
    }

    public List<Bill> getBills() {
        return bills;
    }

    public Set<EventMember> getMembers() {
        return eventMembers;
    }
}
