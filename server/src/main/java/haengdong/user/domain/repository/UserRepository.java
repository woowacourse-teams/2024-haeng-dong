package haengdong.user.domain.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import haengdong.user.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByMemberNumber(String memberNumber);
}
