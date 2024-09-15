package server.haengdong.domain.action;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BillDetailRepository extends JpaRepository<BillDetail, Long> {

    List<BillDetail> findAllByBill(Bill bill);

    @Query("""
            select bd from BillDetail bd
            join fetch bd.member
            where bd.bill.id = :billId
            """)
    List<BillDetail> findAllByBillId(Long billId);

    void deleteAllByMember(Member member);
}
