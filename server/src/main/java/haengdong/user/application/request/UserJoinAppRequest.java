package haengdong.user.application.request;

import haengdong.user.domain.User;

public record UserJoinAppRequest(
        String memberNumber,
        String nickname,
        String picture
) {
    public User toUser() {
        return User.createMember(nickname, memberNumber, picture);
    }
}
