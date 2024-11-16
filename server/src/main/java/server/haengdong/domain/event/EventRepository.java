package server.haengdong.domain.event;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    Optional<Event> findByToken(String token);

    boolean existsByTokenAndUserId(String token, Long userId);
}
