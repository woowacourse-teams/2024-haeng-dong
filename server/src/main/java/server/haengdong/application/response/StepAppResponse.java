package server.haengdong.application.response;

import java.util.List;
import server.haengdong.domain.step.Step;

public record StepAppResponse(
        List<BillAppResponse> bills,
        List<MemberAppResponse> members
) {

    public static StepAppResponse of(Step step) {
        List<BillAppResponse> billAppResponses = step.getBills().stream()
                .map(BillAppResponse::of)
                .toList();

        List<MemberAppResponse> memberAppResponses = step.getMembers().stream()
                .map(MemberAppResponse::of)
                .toList();

        return new StepAppResponse(billAppResponses, memberAppResponses);
    }
}
