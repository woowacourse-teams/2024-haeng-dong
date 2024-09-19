package server.haengdong.domain.step;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import server.haengdong.domain.bill.Bill;
import server.haengdong.domain.member.Member;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

public class Step {

    private final List<Bill> bills;
    private final Set<Member> members;

    private Step(List<Bill> bills, Set<Member> members) {
        this.bills = bills;
        this.members = members;
    }

    public static Step of(Bill bill) {
        List<Bill> bills = new ArrayList<>();
        bills.add(bill);
        Set<Member> members = new HashSet<>(bill.getMembers());

        return new Step(bills, members);
    }

    public void add(Bill bill) {
        if (isNotSameMember(bill)) {
            throw new HaengdongException(HaengdongErrorCode.DIFFERENT_STEP_MEMBERS);
        }

        bills.add(bill);
    }

    public boolean isNotSameMember(Bill bill) {
        Set<Member> otherMembers = Set.copyOf(bill.getMembers());
        return !members.equals(otherMembers);
    }

    public List<Bill> getBills() {
        return bills;
    }

    public Set<Member> getMembers() {
        return members;
    }
}
