package server.haengdong.domain;

import java.util.Arrays;

public enum MemberActionStatus {
    IN,
    OUT,
    ;

    public static MemberActionStatus of(String status) {
        return Arrays.stream(MemberActionStatus.values())
                .filter(s -> s.name().equals(status))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid status: " + status));
    }
}
