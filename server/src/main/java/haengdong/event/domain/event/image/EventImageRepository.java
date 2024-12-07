package haengdong.event.domain.event.image;

import haengdong.event.domain.event.Event;
import java.time.Instant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventImageRepository extends JpaRepository<EventImage, Long> {

    List<EventImage> findAllByEvent(Event event);

    Long countByEvent(Event event);

    List<EventImage> findByCreatedAtAfter(Instant date);
}
