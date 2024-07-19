package server.haengdong.application.request;

import java.util.List;

public record MemberActionSaveListAppRequest(List<MemberActionSaveAppRequest> actions) {
}
