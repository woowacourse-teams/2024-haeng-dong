package server.haengdong.presentation.admin;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import server.haengdong.application.EventService;
import server.haengdong.application.ImageUploadService;
import server.haengdong.application.response.ImageNameAppResponse;
import server.haengdong.presentation.request.EventUpdateRequest;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AdminEventController {

    private final EventService eventService;
    private final ImageUploadService imageUploadService;

    @PostMapping("/api/admin/events/{eventId}/auth")
    public ResponseEntity<Void> authenticate() {
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/api/admin/events/{eventId}")
    public ResponseEntity<Void> updateEvent(
            @PathVariable("eventId") String token,
            @Valid @RequestBody EventUpdateRequest request
    ) {
        eventService.updateEvent(token, request.toAppRequest());

        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/admin/events/{eventId}/images")
    public void uploadMultipleFiles(
            @PathVariable("eventId") String token,
            @RequestPart("images") List<MultipartFile> images
    ) {
        List<ImageNameAppResponse> imageNames = imageUploadService.uploadImages(images);
        eventService.saveImages(token, imageNames);
    }
}
