package server.haengdong.application.request;

public record BillActionUpdateAppRequest(
        String title,
        Long price
) {
}
