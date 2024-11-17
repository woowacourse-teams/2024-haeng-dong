package haengdong.event.application.response;

import java.time.Instant;

public record ImageInfo(
        String name,
        Instant createAt
) {
}
