package server.haengdong.application;

import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.haengdong.application.response.MemberBillReportAppResponse;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.BillActionRepository;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionRepository;
import server.haengdong.domain.action.MemberBillReports;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@RequiredArgsConstructor
@Service
public class ActionService {

    private final BillActionRepository billActionRepository;
    private final MemberActionRepository memberActionRepository;
    private final EventRepository eventRepository;

    public List<MemberBillReportAppResponse> getMemberBillReports(String token) {
        Event event = eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.NOT_FOUND_EVENT));
        List<BillAction> billActions = billActionRepository.findByAction_Event(event);
        List<MemberAction> memberActions = memberActionRepository.findAllByEvent(event);

        MemberBillReports memberBillReports = MemberBillReports.createByActions(billActions, memberActions);

        List<MemberBillReportAppResponse> memberBillReportResponses = new ArrayList<>();
        memberBillReports.getReports().forEach(
                (member, price) -> memberBillReportResponses.add(new MemberBillReportAppResponse(member, price))
        );
        return memberBillReportResponses;
    }
}
