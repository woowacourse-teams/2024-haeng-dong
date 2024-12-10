package haengdong.event.domain.bill;

import static java.util.stream.Collectors.toMap;

import haengdong.event.domain.event.member.EventMember;
import java.util.List;
import java.util.Map;
import lombok.Getter;

@Getter
public class MemberBillReport {

    private final Map<EventMember, Long> reports;

    private MemberBillReport(Map<EventMember, Long> reports) {
        this.reports = reports;
    }

    public static MemberBillReport create(List<EventMember> eventMembers, List<Bill> bills) {
        Map<EventMember, Long> reports = bills.stream()
                .flatMap(bill -> bill.getBillDetails().stream())
                .collect(toMap(
                        BillDetail::getEventMember,
                        BillDetail::getPrice,
                        Long::sum,
                        () -> eventMembers.stream()
                                .collect(toMap(member -> member, member -> 0L))
                ));

        return new MemberBillReport(reports);
    }
}
