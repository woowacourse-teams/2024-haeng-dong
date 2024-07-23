package server.haengdong.domain.action;

import org.springframework.stereotype.Component;

@Component
public class MemberGroupIdProvider {

    public Long createGroupId() {
        return System.currentTimeMillis();
    }
}
