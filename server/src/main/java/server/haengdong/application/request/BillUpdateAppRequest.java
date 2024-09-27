package server.haengdong.application.request;

public record BillUpdateAppRequest(
        String title,
        Long price
) {
}
