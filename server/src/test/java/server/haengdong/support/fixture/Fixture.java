package server.haengdong.support.fixture;

import jakarta.servlet.http.Cookie;
import server.haengdong.domain.event.Event;

public class Fixture {

    public static final Event EVENT1 = new Event("쿠키", "1234", "TOKEN1");
    public static final Event EVENT2 = new Event("웨디", "1234", "TOKEN2");
    public static final Cookie EVENT_COOKIE = new Cookie("eventToken", "토큰토큰");
}
