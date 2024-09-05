package server.haengdong.domain.action;

import static java.util.stream.Collectors.toMap;

import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.function.Function;
import lombok.Getter;

@Getter
public class MemberBillReport {

    private final Map<String, Long> reports;

    private MemberBillReport(Map<String, Long> reports) {
        this.reports = reports;
    }

    public static MemberBillReport createByActions(List<BillAction> billActions, List<MemberAction> memberActions) {
        PriorityQueue<BillAction> sortedBillActions = new PriorityQueue<>(billActions);
        PriorityQueue<MemberAction> sortedMemberActions = new PriorityQueue<>(memberActions);

        Map<String, Long> memberBillReports = initReports(memberActions);
        CurrentMembers currentMembers = new CurrentMembers();
        while (!sortedBillActions.isEmpty() && !sortedMemberActions.isEmpty()) {
            if (isMemberActionTurn(sortedMemberActions, sortedBillActions)) {
                MemberAction memberAction = sortedMemberActions.poll();
                currentMembers = currentMembers.addMemberAction(memberAction);
                continue;
            }
            addBillAction(sortedBillActions, currentMembers, memberBillReports);
        }

        while (!sortedBillActions.isEmpty()) {
            addBillAction(sortedBillActions, currentMembers, memberBillReports);
        }

        return new MemberBillReport(memberBillReports);
    }

    private static Map<String, Long> initReports(List<MemberAction> memberActions) {
        return memberActions.stream()
                .map(MemberAction::getMemberName)
                .distinct()
                .collect(toMap(Function.identity(), i -> 0L));
    }

    private static boolean isMemberActionTurn(
            PriorityQueue<MemberAction> memberActions,
            PriorityQueue<BillAction> billActions
    ) {
        MemberAction memberAction = memberActions.peek();
        BillAction billAction = billActions.peek();

        return memberAction.getSequence().getValue() < billAction.getSequence().getValue();
    }

    private static void addBillAction(
            PriorityQueue<BillAction> sortedBillActions,
            CurrentMembers currentMembers,
            Map<String, Long> memberBillReports
    ) {
        BillAction billAction = sortedBillActions.poll();
        if (currentMembers.isEmpty()) {
            return;
        }

        for (String currentMember : currentMembers.getMembers()) {
            Long currentPrice = billAction.findPriceByMemberName(currentMember);
            Long price = memberBillReports.get(currentMember) + currentPrice;
            memberBillReports.put(currentMember, price);
        }
    }
}
