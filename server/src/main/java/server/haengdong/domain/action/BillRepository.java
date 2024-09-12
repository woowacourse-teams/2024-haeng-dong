package server.haengdong.domain.action;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.haengdong.domain.event.Event;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {

    List<Bill> findByEvent(Event event);

    Optional<Bill> findFirstByEventOrderByIdDesc(Event event);
}
