package haengdong.event.application.request;

public record BillUpdateAppRequest(
        String title,
        Long price
) {
}
