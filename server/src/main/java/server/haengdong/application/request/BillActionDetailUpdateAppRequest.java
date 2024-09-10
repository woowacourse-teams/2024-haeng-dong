package server.haengdong.application.request;

public record BillActionDetailUpdateAppRequest(
        Long memberId,
        Long price,
        boolean isFixed
) {
}
