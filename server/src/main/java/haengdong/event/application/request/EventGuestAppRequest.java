package haengdong.event.application.request;

import haengdong.user.application.request.UserGuestSaveAppRequest;
import haengdong.user.domain.Nickname;

public record EventGuestAppRequest(
        String eventName,
        String nickname,
        String password
) {
    public UserGuestSaveAppRequest toUserRequest() {
        return new UserGuestSaveAppRequest(nickname, password);
    }

    public Nickname getNickname() {
        return new Nickname(nickname);
    }
}
