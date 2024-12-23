package haengdong.support.fixture;

import haengdong.event.domain.bill.Bill;
import haengdong.event.domain.event.Event;
import haengdong.event.domain.event.member.EventMember;
import haengdong.user.domain.Nickname;
import jakarta.servlet.http.Cookie;

public class Fixture {

    public static final Event EVENT1 = Event.createByGuest("쿠키", "TOKEN1", 1L);
    public static final Event EVENT2 = Event.createByGuest("웨디", "TOKEN2", 1L);
    public static final Cookie EVENT_COOKIE = new Cookie("accessToken", "토큰토큰");
    public static final EventMember EVENT_MEMBER_1 = new EventMember(EVENT1, new Nickname("토다리"));
    public static final EventMember EVENT_MEMBER_2 = new EventMember(EVENT1, new Nickname("쿠키"));
    public static final EventMember EVENT_MEMBER_3 = new EventMember(EVENT1, new Nickname("소하"));
    public static final Bill BILL1 = new Bill(EVENT1, "행동대장 회식", 10000L);
    public static final Bill BILL2 = new Bill(EVENT2, "행동대장 회식2", 20000L);
}
