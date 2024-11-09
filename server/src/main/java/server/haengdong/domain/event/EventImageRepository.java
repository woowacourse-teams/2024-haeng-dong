package server.haengdong.domain.event;

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
