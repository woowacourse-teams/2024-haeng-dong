package haengdong.event.presentation.request;

import java.util.List;

public record EventDeleteRequest(List<String> eventIds) {
}
