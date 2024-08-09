package server.haengdong;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@SpringBootApplication
public class HaengdongApplication {

    public static void main(String[] args) {
        log.error("################### 안녕하세요. CI/CD 테스트입니다. ###################");
        SpringApplication.run(HaengdongApplication.class, args);
    }

}
