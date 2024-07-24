package server.haengdong.presentation.response;

import server.haengdong.application.response.CurrentMemberAppResponse;

public record CurrentMemberResponse(String name) {

    public static CurrentMemberResponse of(CurrentMemberAppResponse response) {
        return new CurrentMemberResponse(response.name());
    }
}
