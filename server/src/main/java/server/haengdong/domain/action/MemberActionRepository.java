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

    List<MemberAction> findAllByEvent(@Param("event") Event event);

    @Query("""
            select distinct ma.memberName
            from MemberAction ma
            where ma.event = :event
            """)
    List<String> findAllUniqueMemberByEvent(Event event);

    @Modifying
    @Query("""
            delete
            from MemberAction ma
            where ma.memberName = :memberName and ma.event = :event
            """)
    void deleteAllByEventAndMemberName(Event event, String memberName);

    @Modifying
    @Query("""
            delete
            from MemberAction ma
            where ma.memberName = :memberName and ma.sequence.value >= :sequence
            """)
    void deleteAllByMemberNameAndMinSequence(String memberName, Long sequence);

    List<MemberAction> findAllByEventAndMemberName(Event event, String memberName);

    boolean existsByEventAndMemberName(Event event, String updatedMemberName);

    @Query("""
            select ma
            from MemberAction ma
            where ma.event = :event and ma.sequence.value < :sequence
            """)
    List<MemberAction> findByEventAndSequence(Event event, Long sequence);

    @Query("""
            select ma
            from MemberAction ma
            WHERE ma.event = :event
            ORDER BY ma.sequence.value DESC
            LIMIT 1
            """)
    Optional<MemberAction> findLastByEvent(@Param("event") Event event);

    MemberAction findByIdAndEvent(Long actionId, Event event);
}
