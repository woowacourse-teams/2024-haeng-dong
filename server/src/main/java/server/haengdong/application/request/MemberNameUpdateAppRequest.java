package server.haengdong.application.request;

public record MemberNameUpdateAppRequest(
        Long id,
        String name
) {
}
