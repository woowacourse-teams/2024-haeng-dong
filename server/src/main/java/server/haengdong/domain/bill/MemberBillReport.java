package server.haengdong.domain.bill;

import static java.util.stream.Collectors.toMap;

import java.util.List;
import java.util.Map;
import lombok.Getter;
import server.haengdong.domain.eventmember.EventMember;

@Getter
public class MemberBillReport {

    private final Map<EventMember, Long> reports;

    private MemberBillReport(Map<EventMember, Long> reports) {
        this.reports = reports;
    }

    public static MemberBillReport createByBills(List<Bill> bills) {
        Map<EventMember, Long> reports = bills.stream()
                .flatMap(bill -> bill.getBillDetails().stream())
                .collect(toMap(
                        BillDetail::getEventMember,
                        BillDetail::getPrice,
                        Long::sum
                ));

        return new MemberBillReport(reports);
    }
}
