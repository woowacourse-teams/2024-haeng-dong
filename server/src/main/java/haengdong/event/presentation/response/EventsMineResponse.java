package haengdong.event.presentation.response;

import haengdong.event.application.request.EventMineAppResponse;
import java.util.List;

public record EventsMineResponse(
        List<EventMineResponse> events
) {

    public static EventsMineResponse of(List<EventMineAppResponse> responses) {
        List<EventMineResponse> events = responses.stream()
                .map(EventMineResponse::of)
                .toList();

        return new EventsMineResponse(events);
    }
}
