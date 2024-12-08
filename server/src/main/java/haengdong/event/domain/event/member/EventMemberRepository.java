package haengdong.event.domain.event.member;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import haengdong.event.domain.event.Event;

public interface EventMemberRepository extends JpaRepository<EventMember, Long> {

    List<EventMember> findAllByEvent(Event event);

    boolean existsByEventAndIsDeposited(Event event, boolean isDeposited);
}
