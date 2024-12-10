package haengdong.event.presentation.response;

import haengdong.event.application.request.EventMineAppResponse;
import java.time.LocalDateTime;

public record EventMineResponse(
        String eventId,
        String eventName,
        boolean isFinished,
        LocalDateTime createdAt
) {

    public static EventMineResponse of(EventMineAppResponse response) {
        return new EventMineResponse(response.eventId(), response.eventName(), response.isFinished(), response.createdAt());
    }
}
