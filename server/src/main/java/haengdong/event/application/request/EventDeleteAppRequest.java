package haengdong.event.application.request;

import java.util.List;

public record EventDeleteAppRequest(Long token, List<String> eventIds) {
}
