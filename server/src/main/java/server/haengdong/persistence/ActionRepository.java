package server.haengdong.persistence;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import server.haengdong.domain.Action;
import server.haengdong.domain.Event;

@Repository
public interface ActionRepository extends JpaRepository<Action, Long> {

    @Query("""
            SELECT a
            FROM Action a
            WHERE a.event = :event
            ORDER BY a.sequence DESC
            LIMIT 1
            """)
    Optional<Action> findLastByEvent(@Param("event") Event event);
}
