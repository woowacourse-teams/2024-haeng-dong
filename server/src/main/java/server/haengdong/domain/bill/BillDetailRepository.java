package server.haengdong.domain.bill;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import server.haengdong.domain.member.Member;

@Repository
public interface BillDetailRepository extends JpaRepository<BillDetail, Long> {

    @Modifying
    @Query("delete from BillDetail bd where bd.member = :member")
    void deleteAllByMember(@Param("member") Member member);
}
