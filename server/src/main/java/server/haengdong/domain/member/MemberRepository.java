package server.haengdong.domain.member;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import server.haengdong.domain.event.Event;

public interface MemberRepository extends JpaRepository<Member, Long> {

    List<Member> findAllByEvent(Event event);
}
