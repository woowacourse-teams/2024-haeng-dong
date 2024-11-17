package haengdong.application;

import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import haengdong.support.extension.DatabaseCleanerExtension;

@ExtendWith(DatabaseCleanerExtension.class)
@SpringBootTest(webEnvironment = WebEnvironment.NONE)
abstract class ServiceTestSupport {
}
