package haengdong.event.domain.event;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    Optional<Event> findByToken(String token);

    boolean existsByTokenAndUserId(String token, Long userId);

    List<Event> findByUserId(Long userId);

    void deleteByUserId(Long hostId);
}
