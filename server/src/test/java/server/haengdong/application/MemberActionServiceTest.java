package server.haengdong.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.groups.Tuple.tuple;
import static server.haengdong.domain.action.MemberActionStatus.IN;
import static server.haengdong.domain.action.MemberActionStatus.OUT;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import server.haengdong.application.request.MemberActionSaveAppRequest;
import server.haengdong.application.request.MemberActionsSaveAppRequest;
import server.haengdong.domain.action.Action;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.action.BillActionDetail;
import server.haengdong.domain.action.BillActionDetailRepository;
import server.haengdong.domain.action.BillActionRepository;
import server.haengdong.domain.action.MemberAction;
import server.haengdong.domain.action.MemberActionRepository;
import server.haengdong.domain.action.MemberActionStatus;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.event.EventRepository;
import server.haengdong.exception.HaengdongException;
import server.haengdong.support.fixture.Fixture;

class MemberActionServiceTest extends ServiceTestSupport {

    @Autowired
    private MemberActionService memberActionService;

    @Autowired
    private MemberActionRepository memberActionRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private BillActionRepository billActionRepository;

    @Autowired
    private BillActionDetailRepository billActionDetailRepository;

    @DisplayName("현재 행사에 참여하고 있는 경우에 나갈 수 있다.")
    @Test
    void saveMemberActionTest() {
        Event event = eventRepository.save(Fixture.EVENT1);
        Action action = new Action(event, 1L);
        MemberAction memberAction = new MemberAction(action, "망쵸", IN, 1L);
        memberActionRepository.save(memberAction);

        assertThatCode(() -> memberActionService.saveMemberAction(event.getToken(), new MemberActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("망쵸", "OUT")))))
                .doesNotThrowAnyException();
    }

    @DisplayName("행사에서 퇴장한 경우에 입장할 수 있다.")
    @Test
    void saveMemberActionTest1() {
        Event event = eventRepository.save(Fixture.EVENT1);
        Action actionOne = new Action(event, 1L);
        MemberAction memberActionOne = new MemberAction(actionOne, "망쵸", IN, 1L);
        memberActionRepository.save(memberActionOne);

        Action actionTwo = new Action(event, 2L);
        MemberAction memberActionTwo = new MemberAction(actionTwo, "망쵸", OUT, 1L);
        memberActionRepository.save(memberActionTwo);

        assertThatCode(() -> memberActionService.saveMemberAction(event.getToken(), new MemberActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("망쵸", "IN")))))
                .doesNotThrowAnyException();
    }

    @DisplayName("행사에 입장하지 않았을 경우 퇴장할 수 없다.")
    @Test
    void saveMemberActionTest2() {
        MemberActionsSaveAppRequest appRequest = new MemberActionsSaveAppRequest(
                List.of(new MemberActionSaveAppRequest("TOKEN", "OUT")));

        assertThatCode(() -> memberActionService.saveMemberAction("TOKEN", appRequest))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("이벤트가 없으면 현재 참여 인원을 조회할 수 없다.")
    @Test
    void getCurrentMembers() {
        assertThatThrownBy(() -> memberActionService.getCurrentMembers("token"))
                .isInstanceOf(HaengdongException.class);
    }

    @DisplayName("행사의 전체 참여자 중에서 특정 참여자의 맴버 액션을 전부 삭제한다.")
    @Test
    void deleteMember() {
        Event event = Fixture.EVENT1;
        eventRepository.save(event);
        MemberAction memberAction1 = new MemberAction(new Action(event, 1L), "참여자", IN, 1L);
        MemberAction memberAction2 = new MemberAction(new Action(event, 2L), "토다리", IN, 1L);
        MemberAction memberAction3 = new MemberAction(new Action(event, 3L), "쿠키", IN, 1L);
        MemberAction memberAction4 = new MemberAction(new Action(event, 4L), "소하", IN, 1L);
        MemberAction memberAction5 = new MemberAction(new Action(event, 5L), "웨디", IN, 1L);
        MemberAction memberAction6 = new MemberAction(new Action(event, 6L), "참여자", OUT, 1L);
        memberActionRepository.saveAll(
                List.of(memberAction1, memberAction2, memberAction3, memberAction4, memberAction5, memberAction6));

        Event event2 = Fixture.EVENT2;
        eventRepository.save(event2);
        Action action2 = Action.createFirst(event2);
        MemberAction anotherMemberAction = new MemberAction(action2, "참여자", IN, 1L);
        memberActionRepository.save(anotherMemberAction);

        memberActionService.deleteMember(event.getToken(), "참여자");

        List<MemberAction> memberActions = memberActionRepository.findAll();

        assertThat(memberActions).hasSize(5)
                .extracting("memberName", "status")
                .containsExactly(
                        tuple("토다리", IN),
                        tuple("쿠키", IN),
                        tuple("소하", IN),
                        tuple("웨디", IN),
                        tuple("참여자", IN)
                );
    }

    @DisplayName("이벤트에 속한 멤버을 삭제하면 전체 지출 내역 디테일이 초기화된다.")
    @Test
    void deleteMember1() {
        Event event = Fixture.EVENT1;
        eventRepository.save(event);
        MemberAction memberAction1 = createMemberAction(new Action(event, 1L), "토다리", IN, 1L);
        Action targetAction = new Action(event, 2L);
        MemberAction memberAction2 = createMemberAction(targetAction, "토다리", OUT, 2L);
        MemberAction memberAction3 = createMemberAction(new Action(event, 3L), "쿠키", IN, 3L);
        MemberAction memberAction4 = createMemberAction(new Action(event, 4L), "웨디", IN, 4L);
        MemberAction memberAction5 = createMemberAction(new Action(event, 5L), "감자", IN, 5L);
        memberActionRepository.saveAll(
                List.of(memberAction1,
                        memberAction2,
                        memberAction3,
                        memberAction4,
                        memberAction5
                )
        );
        BillAction billAction = new BillAction(new Action(event, 6L), "뽕족", 100_000L);
        billActionRepository.save(billAction);
        BillActionDetail billActionDetail1 = new BillActionDetail(billAction, "쿠키", 40_000L, true);
        BillActionDetail billActionDetail2 = new BillActionDetail(billAction, "웨디", 30_000L, false);
        BillActionDetail billActionDetail3 = new BillActionDetail(billAction, "감자", 30_000L, false);
        billActionDetailRepository.saveAll(List.of(billActionDetail1, billActionDetail2, billActionDetail3));
        List<BillActionDetail> allByBillAction = billActionDetailRepository.findAllByBillAction(billAction);
        System.out.println("allByBillAction = " + allByBillAction.isEmpty());

        memberActionService.deleteMember(event.getToken(), "쿠키");

        List<BillActionDetail> billActionDetails = billActionDetailRepository.findAllByBillAction(billAction);

        assertThat(billActionDetails).hasSize(2)
                .extracting("memberName", "price")
                .containsExactlyInAnyOrder(
                        tuple("웨디", 50_000L),
                        tuple("감자", 50_000L)
                );
    }

    @DisplayName("이벤트에 속한 멤버 액션을 삭제하면 이후에 기록된 해당 참여자의 모든 멤버 액션을 삭제한다.")
    @Test
    void deleteMemberAction() {
        Event event = Fixture.EVENT1;
        eventRepository.save(event);
        MemberAction memberAction1 = createMemberAction(new Action(event, 1L), "토다리", IN, 1L);
        Action targetAction = new Action(event, 2L);
        MemberAction memberAction2 = createMemberAction(targetAction, "토다리", OUT, 2L);
        MemberAction memberAction3 = createMemberAction(new Action(event, 3L), "쿠키", IN, 3L);
        MemberAction memberAction4 = createMemberAction(new Action(event, 4L), "웨디", IN, 4L);
        MemberAction memberAction5 = createMemberAction(new Action(event, 5L), "토다리", IN, 5L);
        MemberAction memberAction6 = createMemberAction(new Action(event, 6L), "토다리", OUT, 6L);
        MemberAction memberAction7 = createMemberAction(new Action(event, 7L), "쿠키", OUT, 7L);
        memberActionRepository.saveAll(
                List.of(memberAction1,
                        memberAction2,
                        memberAction3,
                        memberAction4,
                        memberAction5,
                        memberAction6,
                        memberAction7)
        );

        memberActionService.deleteMemberAction(event.getToken(), targetAction.getId());
        List<MemberAction> memberActions = memberActionRepository.findAll();

        assertThat(memberActions).hasSize(4)
                .extracting("id", "memberName", "status")
                .containsExactly(
                        tuple(memberAction1.getId(), "토다리", IN),
                        tuple(memberAction3.getId(), "쿠키", IN),
                        tuple(memberAction4.getId(), "웨디", IN),
                        tuple(memberAction7.getId(), "쿠키", OUT)
                );
    }

    @DisplayName("이벤트에 속한 멤버 액션을 삭제하면 이후 지출 내역 디테일이 초기화된다.")
    @Test
    void deleteMemberAction1() {
        Event event = Fixture.EVENT1;
        eventRepository.save(event);
        MemberAction memberAction1 = createMemberAction(new Action(event, 1L), "토다리", IN, 1L);
        Action targetAction = new Action(event, 2L);
        MemberAction memberAction2 = createMemberAction(targetAction, "토다리", OUT, 2L);
        MemberAction memberAction3 = createMemberAction(new Action(event, 3L), "쿠키", IN, 3L);
        MemberAction memberAction4 = createMemberAction(new Action(event, 4L), "웨디", IN, 4L);
        MemberAction memberAction5 = createMemberAction(new Action(event, 5L), "감자", IN, 5L);
        memberActionRepository.saveAll(
                List.of(memberAction1,
                        memberAction2,
                        memberAction3,
                        memberAction4,
                        memberAction5
                )
        );
        BillAction billAction = new BillAction(new Action(event, 6L), "뽕족", 100_000L);
        billActionRepository.save(billAction);
        BillActionDetail billActionDetail1 = new BillActionDetail(billAction, "쿠키", 40_000L, true);
        BillActionDetail billActionDetail2 = new BillActionDetail(billAction, "웨디", 30_000L, false);
        BillActionDetail billActionDetail3 = new BillActionDetail(billAction, "감자", 30_000L, false);
        billActionDetailRepository.saveAll(List.of(billActionDetail1, billActionDetail2, billActionDetail3));

        memberActionService.deleteMemberAction(event.getToken(), targetAction.getId());
        List<BillActionDetail> billActionDetails = billActionDetailRepository.findAllByBillAction(billAction);

        assertThat(billActionDetails).hasSize(4)
                .extracting("memberName", "price")
                .containsExactlyInAnyOrder(
                        tuple("토다리", 25_000L),
                        tuple("쿠키", 25_000L),
                        tuple("웨디", 25_000L),
                        tuple("감자", 25_000L)
                );
    }

    private MemberAction createMemberAction(
            Action action,
            String memberName,
            MemberActionStatus memberActionStatus,
            long memberGroupId
    ) {
        return new MemberAction(action, memberName, memberActionStatus, memberGroupId);
    }
}
