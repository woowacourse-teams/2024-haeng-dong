package server.haengdong.domain.action;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import server.haengdong.domain.event.Event;

@Repository
public interface BillActionRepository extends JpaRepository<BillAction, Long> {

    @EntityGraph(attributePaths = {"action"})
    List<BillAction> findByAction_Event(Event event);

    void deleteByAction_EventAndActionId(Event event, Long actionId);

    Optional<BillAction> findByAction_Id(Long actionId);

    @Query("""
                select ba
                from BillAction ba
                where ba.action.sequence > :sequence
            """)
    List<BillAction> findByGreaterThanSequence(Long sequence);
}
