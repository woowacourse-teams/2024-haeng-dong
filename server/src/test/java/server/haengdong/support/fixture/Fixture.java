package server.haengdong.support.fixture;

import jakarta.servlet.http.Cookie;
import server.haengdong.domain.action.Bill;
import server.haengdong.domain.action.Member;
import server.haengdong.domain.event.Event;

public class Fixture {

    public static final Event EVENT1 = new Event("쿠키", "1234", "TOKEN1");
    public static final Event EVENT2 = new Event("웨디", "1234", "TOKEN2");
    public static final Cookie EVENT_COOKIE = new Cookie("eventToken", "토큰토큰");
    public static final Member MEMBER1 = new Member(EVENT1, "토다리");
    public static final Member MEMBER2 = new Member(EVENT1, "쿠키");
    public static final Bill BILL1 = new Bill(EVENT1, "행동대장 회식", 10000L);
    public static final Bill BILL2 = new Bill(EVENT2, "행동대장 회식2", 20000L);
//    public static final Bill BILL_ACTION = new Bill(EVENT1, new Sequence(1L), "뽕족", 30_000L);
//
//    public static Bill createBillAction(Event event, Long sequence, String title, Long price) {
//        return new Bill(event, new Sequence(sequence), title, price);
//    }
//
//    public static MemberAction createMemberAction(
//            Event event, Long sequence, String memberName, MemberActionStatus status
//    ) {
//        return new MemberAction(event, new Sequence(sequence), memberName, status);
//    }
}
