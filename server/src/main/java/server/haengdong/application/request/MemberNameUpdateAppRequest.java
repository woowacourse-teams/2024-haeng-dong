package server.haengdong.application.request;

public record MemberNameUpdateAppRequest(
        String before,
        String after
) {
}
