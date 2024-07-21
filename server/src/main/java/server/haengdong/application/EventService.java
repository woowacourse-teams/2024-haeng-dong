package server.haengdong.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.haengdong.application.request.EventAppRequest;
import server.haengdong.application.response.EventAppResponse;
import server.haengdong.domain.Event;
import server.haengdong.domain.EventTokenProvider;
import server.haengdong.persistence.EventRepository;

@RequiredArgsConstructor
@Service
public class EventService {

    private final EventRepository eventRepository;
    private final EventTokenProvider eventTokenProvider;

    public EventAppResponse saveEvent(EventAppRequest request) {
        String token = eventTokenProvider.createToken();
        Event event = request.toEvent(token);
        eventRepository.save(event);

        return EventAppResponse.of(event);
    }
}
