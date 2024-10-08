package server.haengdong;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Slf4j
@SpringBootApplication
public class HaengdongApplication {

    public static void main(String[] args) {
        SpringApplication.run(HaengdongApplication.class, args);
    }

}
