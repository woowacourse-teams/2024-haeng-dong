package server.haengdong.domain.eventmember;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import server.haengdong.domain.event.Event;

public interface EventMemberRepository extends JpaRepository<EventMember, Long> {

    List<EventMember> findAllByEvent(Event event);
}
