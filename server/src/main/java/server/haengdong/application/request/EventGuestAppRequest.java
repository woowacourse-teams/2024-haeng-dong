package server.haengdong.application.request;

public record EventGuestAppRequest(
        String eventName,
        String nickname,
        String password
) {
    public UserGuestSaveAppRequest toUserRequest() {
        return new UserGuestSaveAppRequest(nickname, password);
    }
}
