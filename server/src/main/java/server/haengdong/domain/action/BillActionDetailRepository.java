package server.haengdong.domain.action;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillActionDetailRepository extends JpaRepository<BillActionDetail, Long> {

    @Query("""
            select bd
            from BillActionDetail bd
            where bd.billAction = :billAction
            """)
    List<BillActionDetail> findAllByBillAction(BillAction billAction);

    List<BillActionDetail> findByBillAction(BillAction billAction);

    void deleteAllByBillAction(BillAction billAction);

    void deleteByBillAction_Action_EventAndBillAction_ActionId(Event event, Long actionId);
}
