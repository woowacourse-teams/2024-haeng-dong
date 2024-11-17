package haengdong.event.application.request;

import haengdong.user.application.request.UserGuestSaveAppRequest;

public record EventGuestAppRequest(
        String eventName,
        String nickname,
        String password
) {
    public UserGuestSaveAppRequest toUserRequest() {
        return new UserGuestSaveAppRequest(nickname, password);
    }
}
