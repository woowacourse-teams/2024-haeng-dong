package server.haengdong.presentation.request;

import server.haengdong.application.request.MemberActionSaveAppRequest;

public record MemberActionSaveRequest(String name, String status) {

    public MemberActionSaveAppRequest toAppRequest() {
        return new MemberActionSaveAppRequest(name, status);
    }
}
