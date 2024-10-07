package server.haengdong.application;

import java.util.List;
import java.util.Map.Entry;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.EventAppRequest;
import server.haengdong.application.request.EventLoginAppRequest;
import server.haengdong.application.request.EventUpdateAppRequest;
import server.haengdong.application.response.EventAppResponse;
import server.haengdong.application.response.EventDetailAppResponse;
import server.haengdong.application.response.EventImageAppResponse;
import server.haengdong.application.response.ImageNameAppResponse;
import server.haengdong.application.response.MemberBillReportAppResponse;
import server.haengdong.domain.bill.Bill;
import server.haengdong.domain.bill.BillRepository;
import server.haengdong.domain.bill.MemberBillReport;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventImage;
import server.haengdong.domain.event.EventImageRepository;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.domain.event.EventTokenProvider;
import server.haengdong.domain.member.Member;
import server.haengdong.exception.AuthenticationException;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class EventService {

    private static final String CLOUD_FRONT_URL = "https://d2unln22cedgp9.cloudfront.net/";

    private final EventRepository eventRepository;
    private final EventTokenProvider eventTokenProvider;
    private final BillRepository billRepository;
    private final EventImageRepository eventImageRepository;

    @Transactional
    public EventAppResponse saveEvent(EventAppRequest request) {
        String token = eventTokenProvider.createToken();
        Event event = request.toEvent(token);
        eventRepository.save(event);

        return EventAppResponse.of(event);
    }

    public EventDetailAppResponse findEvent(String token) {
        Event event = getEvent(token);

        return EventDetailAppResponse.of(event);
    }

    public void validatePassword(EventLoginAppRequest request) throws HaengdongException {
        Event event = getEvent(request.token());
        if (event.isPasswordMismatch(request.password())) {
            throw new AuthenticationException(HaengdongErrorCode.PASSWORD_INVALID);
        }
    }

    private Event getEvent(String token) {
        return eventRepository.findByToken(token)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.EVENT_NOT_FOUND));
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

    private MemberBillReportAppResponse createMemberBillReportResponse(Entry<Member, Long> entry) {
        Member member = entry.getKey();
        Long price = entry.getValue();

        return new MemberBillReportAppResponse(
                member.getId(),
                member.getName(),
                member.isDeposited(),
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
    public void saveImages(String token, List<ImageNameAppResponse> imageNames) {
        Event event = getEvent(token);

        List<EventImage> images = imageNames.stream()
                .map(imageNameAppResponse -> imageNameAppResponse.toEventImage(event))
                .toList();

        eventImageRepository.saveAll(images);
    }

    public List<EventImageAppResponse> findImages(String token) {
        Event event = getEvent(token);

        return eventImageRepository.findAllByEvent(event)
                .stream()
                .map(image -> new EventImageAppResponse(CLOUD_FRONT_URL + image.getName()))
                .toList();
    }
}
