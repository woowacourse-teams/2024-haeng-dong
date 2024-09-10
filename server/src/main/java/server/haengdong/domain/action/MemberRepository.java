package server.haengdong.domain.action;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import server.haengdong.domain.event.Event;

public interface MemberRepository extends JpaRepository<Member, Long> {
    List<Member> findAllByEvent(Event event);

    Optional<Member> findByEventAndName(Event event, String name);
}
