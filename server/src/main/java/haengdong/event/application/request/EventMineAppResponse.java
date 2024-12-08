package haengdong.event.application.request;

import haengdong.event.domain.event.Event;
import java.time.LocalDateTime;
import java.time.ZoneId;

public record EventMineAppResponse(
        String eventId,
        String eventName,
        boolean isFinished,
        LocalDateTime createdAt
) {
    public static EventMineAppResponse of(Event event, boolean isFinished) {
        return new EventMineAppResponse(event.getToken(), event.getName(), isFinished, LocalDateTime.ofInstant(event.getCreatedAt(), ZoneId.of("Asia/Seoul")) );
    }
}
