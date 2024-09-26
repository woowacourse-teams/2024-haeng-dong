package server.haengdong.application.request;

public record BillDetailUpdateAppRequest(
        Long id,
        Long price,
        boolean isFixed
) {
}
