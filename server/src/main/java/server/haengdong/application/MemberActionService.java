package server.haengdong.application;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.MemberActionSaveListAppRequest;
import server.haengdong.domain.Event;
import server.haengdong.domain.MemberAction;
import server.haengdong.domain.MemberActionFactory;
import server.haengdong.persistence.EventRepository;
import server.haengdong.persistence.MemberActionRepository;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberActionService {

    private final MemberActionRepository memberActionRepository;
    private final EventRepository eventRepository;
    private final MemberActionFactory memberActionFactory;

    @Transactional
    public void saveMemberAction(String token, MemberActionSaveListAppRequest request) {
        Event event = eventRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("event not found"));

        List<MemberAction> findMemberActions = memberActionRepository.findAllByEvent(event);
        List<MemberAction> memberActions = memberActionFactory.createMemberActions(request, findMemberActions, event);
        memberActionRepository.saveAll(memberActions);
    }
}
