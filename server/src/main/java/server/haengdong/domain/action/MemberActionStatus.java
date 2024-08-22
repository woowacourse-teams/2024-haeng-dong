package server.haengdong.domain.action;

import java.util.Arrays;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

public enum MemberActionStatus {
    IN,
    OUT,
    ;

    public static MemberActionStatus of(String status) {
        return Arrays.stream(MemberActionStatus.values())
                .filter(s -> s.name().equals(status))
                .findFirst()
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.MEMBER_ACTION_STATUS_INVALID,
                        String.format(HaengdongErrorCode.MEMBER_ACTION_STATUS_INVALID.getMessage(), status)));
    }
}
