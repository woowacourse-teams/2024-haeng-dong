package server.haengdong.domain.action;

import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.haengdong.domain.event.Event;

@Repository
public interface BillActionRepository extends JpaRepository<BillAction, Long> {

    @EntityGraph(attributePaths = {"action"})
    List<BillAction> findByAction_Event(Event event);

    void deleteByActionId(Long actionId);
}
