package server.haengdong.domain.action;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import server.haengdong.domain.event.Event;

@Repository
public interface BillActionRepository extends JpaRepository<BillAction, Long> {

    List<BillAction> findByEvent(Event event);

    @Query("""
                select ba
                from BillAction ba
                where ba.event = :event and ba.sequence.value > :sequence
            """)
    List<BillAction> findByEventAndGreaterThanSequence(Event event, Long sequence);

    @Query("""
            select ba
            from BillAction ba
            WHERE ba.event = :event
            ORDER BY ba.sequence DESC
            LIMIT 1
            """)
    Optional<BillAction> findLastByEvent(@Param("event") Event event);
}
