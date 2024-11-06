package server.haengdong.application;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class EventImageFacadeService {

    private final EventService eventService;
    private final ImageService imageService;

    public void uploadImages(String token, List<MultipartFile> images) {
        eventService.validateImageCount(token, images.size());
        List<String> imageNames = imageService.uploadImages(images);
        eventService.saveImages(token, imageNames);
    }

    public void deleteImage(String token, Long imageId) {
        String imageName = eventService.deleteImage(token, imageId);
        imageService.deleteImage(imageName);
    }
}
