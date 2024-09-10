package server.haengdong.presentation.request;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record MemberInActionsSaveRequest(
        @NotEmpty
        List<String> members
) {
}
