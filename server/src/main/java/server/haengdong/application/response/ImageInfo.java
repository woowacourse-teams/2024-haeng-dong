package server.haengdong.application.response;

import java.time.Instant;

public record ImageInfo(
        String name,
        Instant createAt
) {
}
