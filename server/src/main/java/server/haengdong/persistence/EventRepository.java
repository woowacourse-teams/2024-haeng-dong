package server.haengdong.persistence;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.haengdong.domain.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Optional<Event> findByToken(String token);
}
