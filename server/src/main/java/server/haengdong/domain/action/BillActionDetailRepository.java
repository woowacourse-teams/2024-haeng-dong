package server.haengdong.domain.action;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.haengdong.domain.event.Event;

@Repository
public interface BillActionDetailRepository extends JpaRepository<BillActionDetail, Long> {

    List<BillActionDetail> findByBillAction(BillAction billAction);

    void deleteAllByBillAction(BillAction billAction);

    void deleteByBillAction_Action_EventAndBillAction_ActionId(Event event, Long actionId);
}
