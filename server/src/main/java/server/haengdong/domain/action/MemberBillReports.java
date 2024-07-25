package server.haengdong.domain.action;

import static java.util.stream.Collectors.toMap;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Set;
import java.util.function.Function;
import lombok.Getter;

@Getter
public class MemberBillReports {

    private final Map<String, Long> reports;

    private MemberBillReports(Map<String, Long> reports) {
        this.reports = reports;
    }

    public static MemberBillReports createByActions(List<BillAction> billActions, List<MemberAction> memberActions) {
        PriorityQueue<BillAction> sortedBillActions = new PriorityQueue<>(billActions);
        PriorityQueue<MemberAction> sortedMemberActions = new PriorityQueue<>(memberActions);

        Map<String, Long> memberBillReports = initReports(memberActions);
        Set<String> currentMembers = new HashSet<>();

        while (!sortedBillActions.isEmpty() && !sortedMemberActions.isEmpty()) {
            if (isMemberActionTurn(sortedMemberActions, sortedBillActions)) {
                addMemberAction(sortedMemberActions, currentMembers);
                continue;
            }
            addBillAction(sortedBillActions, currentMembers, memberBillReports);
        }

        while (!sortedBillActions.isEmpty()) {
            addBillAction(sortedBillActions, currentMembers, memberBillReports);
        }

        return new MemberBillReports(memberBillReports);
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

        return memberAction.getSequence() < billAction.getSequence();
    }

    private static void addMemberAction(PriorityQueue<MemberAction> sortedMemberActions, Set<String> currentMembers) {
        MemberAction memberAction = sortedMemberActions.poll();
        String memberName = memberAction.getMemberName();
        if (memberAction.isSameStatus(MemberActionStatus.IN)) {
            currentMembers.add(memberName);
            return;
        }
        currentMembers.remove(memberAction.getMemberName());
    }

    private static void addBillAction(
            PriorityQueue<BillAction> sortedBillActions,
            Set<String> currentMembers,
            Map<String, Long> memberBillReports
    ) {
        BillAction billAction = sortedBillActions.poll();
        Long pricePerMember = billAction.getPrice() / currentMembers.size();
        for (String currentMember : currentMembers) {
            Long price = memberBillReports.getOrDefault(currentMember, 0L) + pricePerMember;
            memberBillReports.put(currentMember, price);
        }
    }
}
