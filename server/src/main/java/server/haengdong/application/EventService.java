package server.haengdong.application;

import java.time.Instant;
import java.util.List;
import java.util.Map.Entry;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.EventAppRequest;
import server.haengdong.application.request.EventGuestAppRequest;
import server.haengdong.application.request.EventLoginAppRequest;
import server.haengdong.application.request.EventUpdateAppRequest;
import server.haengdong.application.response.EventAppResponse;
import server.haengdong.application.response.EventDetailAppResponse;
import server.haengdong.application.response.EventImageAppResponse;
import server.haengdong.application.response.EventImageSaveAppResponse;
import server.haengdong.application.response.MemberBillReportAppResponse;
import server.haengdong.domain.RandomValueProvider;
import server.haengdong.domain.bill.Bill;
import server.haengdong.domain.bill.BillRepository;
import server.haengdong.domain.bill.MemberBillReport;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventImage;
import server.haengdong.domain.event.EventImageRepository;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.domain.eventmember.EventMember;
import server.haengdong.domain.eventmember.EventMemberRepository;
import server.haengdong.exception.AuthenticationException;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class EventService {

    private static final int MAX_IMAGE_COUNT = 10;

    private final EventRepository eventRepository;
    private final RandomValueProvider randomValueProvider;
    private final BillRepository billRepository;
    private final EventImageRepository eventImageRepository;
    private final EventMemberRepository eventMemberRepository;
    private final UserService userService;

    @Value("${image.base-url}")
    private String baseUrl;

    @Transactional
    public EventAppResponse saveEventGuest(EventGuestAppRequest request) {
        Long userId = userService.joinGuest(request.toUserRequest());
        String token = randomValueProvider.createRandomValue();
        Event event = new Event(request.eventName(), userId, token);
        eventRepository.save(event);

        eventMemberRepository.save(new EventMember(event, request.nickname()));
        return EventAppResponse.of(event);
    }

    @Transactional
    public EventAppResponse saveEvent(EventAppRequest request) {
        String token = randomValueProvider.createRandomValue();
        Event event = new Event(request.name(), request.userId(), token);
        eventRepository.save(event);

        String nickname = userService.findNicknameById(request.userId());
        eventMemberRepository.save(new EventMember(event, nickname));

        return EventAppResponse.of(event);
    }

    public EventDetailAppResponse findEvent(String token) {
        Event event = getEvent(token);

        return EventDetailAppResponse.of(event);
    }

    public EventAppResponse findByGuestPassword(EventLoginAppRequest request) {
        Event event = getEvent(request.token());
        userService.validateUser(event.getUserId(), request.password());
        return EventAppResponse.of(event);
    }

    public List<MemberBillReportAppResponse> getMemberBillReports(String token) {
        Event event = eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));
        List<Bill> bills = billRepository.findAllByEvent(event);

        MemberBillReport memberBillReport = MemberBillReport.createByBills(bills);

        return memberBillReport.getReports().entrySet().stream()
                .map(this::createMemberBillReportResponse)
                .toList();
    }

    private MemberBillReportAppResponse createMemberBillReportResponse(Entry<EventMember, Long> entry) {
        EventMember eventMember = entry.getKey();
        Long price = entry.getValue();

        return new MemberBillReportAppResponse(
                eventMember.getId(),
                eventMember.getName(),
                eventMember.isDeposited(),
                price
        );
    }

    @Transactional
    public void updateEvent(String token, EventUpdateAppRequest request) {
        Event event = getEvent(token);
        if (request.isEventNameExist()) {
            event.rename(request.eventName());
        }
        if (request.isAccountExist()) {
            event.changeAccount(request.bankName(), request.accountNumber());
        }
    }

    @Transactional
    public List<EventImageSaveAppResponse> saveImages(String token, List<String> originalImageNames) {
        Event event = getEvent(token);
        validateImageCount(originalImageNames, event);

        List<EventImage> eventImages = originalImageNames.stream()
                .map(imageName -> new EventImage(event, randomValueProvider.createRandomValue() + imageName))
                .toList();

        eventImageRepository.saveAll(eventImages);

        return eventImages.stream()
                .map(EventImageSaveAppResponse::of)
                .toList();
    }

    private void validateImageCount(List<String> images, Event event) {
        Long imageCount = eventImageRepository.countByEvent(event);
        Long totalImageCount = imageCount + images.size();

        if (totalImageCount > MAX_IMAGE_COUNT) {
            throw new HaengdongException(HaengdongErrorCode.IMAGE_COUNT_INVALID, totalImageCount);
        }
    }

    public List<EventImageAppResponse> findImages(String token) {
        Event event = getEvent(token);

        return eventImageRepository.findAllByEvent(event)
                .stream()
                .map(image -> new EventImageAppResponse(image.getId(), createUrl(image)))
                .toList();
    }

    private String createUrl(EventImage image) {
        return baseUrl + image.getName();
    }

    @Transactional
    public String deleteImage(String token, Long imageId) {
        EventImage eventImage = getEventImage(imageId);

        Event event = eventImage.getEvent();
        if (event.isTokenMismatch(token)) {
            throw new AuthenticationException(HaengdongErrorCode.PASSWORD_INVALID);
        }
        eventImageRepository.delete(eventImage);
        return eventImage.getName();
    }

    @Transactional
    public void deleteImage(Long imageId) {
        eventImageRepository.deleteById(imageId);
    }

    @Transactional
    public void deleteImages(String token, List<Long> imageIds) {
        imageIds.forEach(imageId -> deleteImage(token, imageId));
    }

    private Event getEvent(String token) {
        return eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));
    }

    private EventImage getEventImage(Long imageId) {
        return eventImageRepository.findById(imageId)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.IMAGE_NOT_FOUND));
    }

    public List<EventImageSaveAppResponse> findImagesDateBefore(Instant date) {
        return eventImageRepository.findByCreatedAtAfter(date).stream()
                .map(EventImageSaveAppResponse::of)
                .toList();
    }

    public boolean existsByTokenAndUserId(String eventToken, Long userId) {
        return eventRepository.existsByTokenAndUserId(eventToken, userId);
    }
}
