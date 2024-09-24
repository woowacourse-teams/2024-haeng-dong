package server.haengdong.domain.bill;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import server.haengdong.domain.event.Event;

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
            select b
            from Bill b
            join fetch b.billDetails bd
            join fetch bd.member
            where b.event = :event
            order by b.id desc
            limit 1
            """)
    Optional<Bill> findFirstByEventOrderByIdDesc(Event event);
}
