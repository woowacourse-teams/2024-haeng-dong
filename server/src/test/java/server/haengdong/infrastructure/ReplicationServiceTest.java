package server.haengdong.infrastructure;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ReplicationServiceTest {

    @Autowired
    private ReplicationService service;

    @DisplayName("read")
    @Test
    void read() {
        service.read();
    }

    @DisplayName("write")
    @Test
    void write() {
        service.write();
    }
}
