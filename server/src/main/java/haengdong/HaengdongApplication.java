package haengdong;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.retry.annotation.EnableRetry;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@Slf4j
@EnableRetry
@EnableAsync
@EnableScheduling
@SpringBootApplication
public class HaengdongApplication {

    public static void main(String[] args) {
        SpringApplication.run(HaengdongApplication.class, args);
    }

}
