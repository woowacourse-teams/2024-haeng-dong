package server.haengdong.domain.action;

import java.util.List;
import java.util.Optional;
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

    @Query("""
            select distinct m.memberName
            from MemberAction m
            where m.action.event = :event
            """)
    List<String> findAllUniqueMemberByEvent(Event event);

    @Modifying
    @Query("""
            delete
            from MemberAction m
            where m.memberName = :memberName and m.action.event = :event
            """)
    void deleteAllByEventAndMemberName(Event event, String memberName);

    Optional<MemberAction> findByAction(Action action);

    @Modifying
    @Query("""
            delete
            from MemberAction m
            where m.memberName = :memberName and m.action.sequence >= :sequence
            """)
    void deleteAllByMemberNameAndMinSequence(String memberName, Long sequence);

    List<MemberAction> findAllByAction_EventAndMemberName(Event event, String memberName);

    boolean existsByAction_EventAndMemberName(Event event, String updatedMemberName);
}
