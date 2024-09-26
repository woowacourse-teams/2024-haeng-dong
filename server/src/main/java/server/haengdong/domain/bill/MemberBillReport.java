package server.haengdong.domain.bill;

import static java.util.stream.Collectors.toMap;

import java.util.List;
import java.util.Map;
import lombok.Getter;
import server.haengdong.domain.member.Member;

@Getter
public class MemberBillReport {

    private final Map<Member, Long> reports;

    private MemberBillReport(Map<Member, Long> reports) {
        this.reports = reports;
    }

    public static MemberBillReport createByBills(List<Bill> bills) {
        Map<Member, Long> reports = bills.stream()
                .flatMap(bill -> bill.getBillDetails().stream())
                .collect(toMap(
                        BillDetail::getMember,
                        BillDetail::getPrice,
                        Long::sum
                ));

        return new MemberBillReport(reports);
    }
}
