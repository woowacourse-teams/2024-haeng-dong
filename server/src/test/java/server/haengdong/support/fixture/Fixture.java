package server.haengdong.support.fixture;

import jakarta.servlet.http.Cookie;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionStatus;
import server.haengdong.domain.action.Sequence;
import server.haengdong.domain.event.Event;

public class Fixture {

    public static final Event EVENT1 = new Event("쿠키", "1234", "TOKEN1");
    public static final Event EVENT2 = new Event("웨디", "1234", "TOKEN2");
    public static final Cookie EVENT_COOKIE = new Cookie("eventToken", "토큰토큰");
    public static final BillAction BILL_ACTION = new BillAction(EVENT1, new Sequence(1L), "뽕족", 30_000L);

    public static BillAction createBillAction(Event event, Long sequence, String title, Long price) {
        return new BillAction(event, new Sequence(sequence), title, price);
    }

    public static MemberAction createMemberAction(
            Event event, Long sequence, String memberName, MemberActionStatus status
    ) {
        return new MemberAction(event, new Sequence(sequence), memberName, status);
    }
}
