package server.haengdong.domain.bill;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.member.Member;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {

    @Query("""
            select b
            from Bill b
            join fetch b.billDetails bd
            join fetch bd.member
            where b.event = :event
            """)
    List<Bill> findAllByEvent(Event event);

    @Query("""
            select bd.member
            from BillDetail bd
            where bd.bill = (select b
                                from Bill b
                                where b.event = :event
                                order by bd.bill.id desc
                                limit 1)
            
            """)
    List<Member> findCurrentMembers(Event event);
}
