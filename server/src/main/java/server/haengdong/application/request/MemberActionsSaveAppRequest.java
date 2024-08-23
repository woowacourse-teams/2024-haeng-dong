package server.haengdong.application.request;

import java.util.List;

public record MemberActionsSaveAppRequest(List<MemberActionSaveAppRequest> actions) {
}
