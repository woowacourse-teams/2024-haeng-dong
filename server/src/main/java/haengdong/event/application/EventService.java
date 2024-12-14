package haengdong.event.application;

import haengdong.common.exception.AuthenticationException;
import haengdong.common.exception.HaengdongErrorCode;
import haengdong.common.exception.HaengdongException;
import haengdong.event.application.request.EventAppRequest;
import haengdong.event.application.request.EventGuestAppRequest;
import haengdong.event.application.request.EventLoginAppRequest;
import haengdong.event.application.request.EventMineAppResponse;
import haengdong.event.application.request.EventUpdateAppRequest;
import haengdong.event.application.response.EventAppResponse;
import haengdong.event.application.response.EventDetailAppResponse;
import haengdong.event.application.response.EventImageAppResponse;
import haengdong.event.application.response.EventImageSaveAppResponse;
import haengdong.event.application.response.MemberBillReportAppResponse;
import haengdong.event.application.response.UserAppResponse;
import haengdong.event.domain.RandomValueProvider;
import haengdong.event.domain.bill.Bill;
import haengdong.event.domain.bill.BillRepository;
import haengdong.event.domain.bill.MemberBillReport;
import haengdong.event.domain.event.Event;
import haengdong.event.domain.event.EventRepository;
import haengdong.event.domain.event.image.EventImage;
import haengdong.event.domain.event.image.EventImageRepository;
import haengdong.event.domain.event.member.EventMember;
import haengdong.event.domain.event.member.EventMemberRepository;
import haengdong.user.application.UserService;
import java.time.Instant;
import java.util.List;
import java.util.Map.Entry;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public EventAppResponse saveEventGuest(EventGuestAppRequest request) {
        Long userId = userService.joinGuest(request.toUserRequest());
        String token = randomValueProvider.createRandomValue();
        Event event = new Event(request.eventName(), userId, token);
        eventRepository.save(event);

        eventMemberRepository.save(EventMember.createHost(event, request.nickname()));
        return EventAppResponse.of(event);
    }

    @Transactional
    public EventAppResponse saveEvent(EventAppRequest request) {
        String token = randomValueProvider.createRandomValue();
        Event event = new Event(request.name(), request.userId(), token);
        eventRepository.save(event);

        String nickname = userService.findNicknameById(request.userId());
        eventMemberRepository.save(EventMember.createHost(event, nickname));

        return EventAppResponse.of(event);
    }

    public EventDetailAppResponse findEvent(String token) {
        Event event = getEvent(token);
        Long userId = event.getUserId();
        UserAppResponse user = userService.findById(userId);

        return EventDetailAppResponse.of(event, user);
    }

    public EventAppResponse findByGuestPassword(EventLoginAppRequest request) {
        Event event = getEvent(request.token());
        userService.validateUser(event.getUserId(), request.password());
        return EventAppResponse.of(event);
    }

    public List<MemberBillReportAppResponse> getMemberBillReports(String token) {
        Event event = getEvent(token);
        List<EventMember> eventMembers = eventMemberRepository.findAllByEvent(event);
        List<Bill> bills = billRepository.findAllByEvent(event);

        MemberBillReport memberBillReport = MemberBillReport.create(eventMembers, bills);

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
    public void updateEventName(String token, EventUpdateAppRequest request) {
        Event event = getEvent(token);
        event.rename(request.eventName());
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
        long totalImageCount = imageCount + images.size();

        if (totalImageCount > MAX_IMAGE_COUNT) {
            throw new HaengdongException(HaengdongErrorCode.IMAGE_COUNT_INVALID, totalImageCount);
        }
    }

    public List<EventImageAppResponse> findImages(String token) {
        Event event = getEvent(token);

        return eventImageRepository.findAllByEvent(event)
                .stream()
                .map(image -> new EventImageAppResponse(image.getId(), image.getName()))
                .toList();
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

    public List<EventImageSaveAppResponse> findImagesDateBefore(Instant date) {
        return eventImageRepository.findByCreatedAtAfter(date).stream()
                .map(EventImageSaveAppResponse::of)
                .toList();
    }

    public boolean existsByTokenAndUserId(String eventToken, Long userId) {
        return eventRepository.existsByTokenAndUserId(eventToken, userId);
    }

    private Event getEvent(String token) {
        return eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));
    }

    private EventImage getEventImage(Long imageId) {
        return eventImageRepository.findById(imageId)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.IMAGE_NOT_FOUND));
    }

    public List<EventMineAppResponse> findByUserId(Long userId) {
        return eventRepository.findByUserId(userId).stream()
                .map(event -> EventMineAppResponse.of(
                        event, !eventMemberRepository.existsByEventAndIsDeposited(event, false)))
                .toList();
    }
}
