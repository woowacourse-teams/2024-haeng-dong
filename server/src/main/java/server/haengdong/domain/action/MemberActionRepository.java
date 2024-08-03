package server.haengdong.domain.action;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import server.haengdong.domain.event.Event;

@Repository
public interface MemberActionRepository extends JpaRepository<MemberAction, Long> {

    @Query("select m from MemberAction m join fetch m.action where m.action.event = :event")
    List<MemberAction> findAllByEvent(@Param("event") Event event);

    @Modifying
    @Query("""
            delete
            from MemberAction m
            where m.memberName = :memberName
            """)
    void deleteAllByMemberName(String memberName);
}
