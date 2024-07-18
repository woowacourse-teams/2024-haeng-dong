package server.haengdong.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.haengdong.domain.Action;

@Repository
public interface ActionRepository extends JpaRepository<Action, Long> {
}
