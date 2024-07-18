package server.haengdong.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.haengdong.domain.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
}
