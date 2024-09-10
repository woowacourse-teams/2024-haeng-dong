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

    List<MemberAction> findAllByMember_Event(@Param("event") Event event);

    void deleteAllByMember(Member member);

    @Modifying
    @Query("""
            delete
            from MemberAction ma
            where ma.member = :member and ma.sequence.value >= :sequence
            """)
    void deleteAllByMemberAndMinSequence(Member member, Long sequence);

    @Query("""
            select ma
            from MemberAction ma
            where ma.member.event = :event and ma.sequence.value < :sequence
            """)
    List<MemberAction> findByEventAndSequence(Event event, Long sequence);

    @Query("""
            select ma
            from MemberAction ma
            WHERE ma.member.event = :event
            ORDER BY ma.sequence.value DESC
            LIMIT 1
            """)
    Optional<MemberAction> findLastByEvent(@Param("event") Event event);

    MemberAction findByIdAndMember_Event(Long actionId, Event event);
}
