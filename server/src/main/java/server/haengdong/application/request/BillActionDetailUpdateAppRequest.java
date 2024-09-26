package server.haengdong.application.request;

public record BillActionDetailUpdateAppRequest(
        String name,
        Long price,
        boolean isFixed
) {
}
