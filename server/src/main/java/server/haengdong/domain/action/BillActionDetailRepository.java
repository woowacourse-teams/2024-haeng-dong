package server.haengdong.domain.action;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillActionDetailRepository extends JpaRepository<BillActionDetail, Long> {
}
