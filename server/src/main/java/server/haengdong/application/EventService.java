package server.haengdong.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.haengdong.application.request.EventAppRequest;
import server.haengdong.application.response.EventAppResponse;
import server.haengdong.application.response.EventDetailAppResponse;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.domain.event.EventTokenProvider;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

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

    public EventDetailAppResponse findEvent(String token) {
        Event event = eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.NOT_FOUND_EVENT));

        return EventDetailAppResponse.of(event);
    }
}
