package server.haengdong.persistence;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import server.haengdong.domain.Event;
import server.haengdong.domain.MemberAction;

@Repository
public interface MemberActionRepository extends JpaRepository<MemberAction, Long> {

    @Query("select m from MemberAction m join fetch m.action where m.action.event = :event")
    List<MemberAction> findAllByEvent(@Param("event") Event event);
}
