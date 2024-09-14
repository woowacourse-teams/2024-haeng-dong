//package server.haengdong.application;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.assertj.core.api.Assertions.assertThatCode;
//import static org.assertj.core.api.Assertions.assertThatThrownBy;
//import static org.assertj.core.groups.Tuple.tuple;
//import static server.haengdong.domain.action.MemberActionStatus.IN;
//import static server.haengdong.domain.action.MemberActionStatus.OUT;
//
//import java.util.List;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import server.haengdong.application.request.MemberActionSaveAppRequest;
//import server.haengdong.domain.action.Bill;
//import server.haengdong.domain.action.BillDetail;
//import server.haengdong.domain.action.BillRepository;
//import server.haengdong.domain.event.Event;
//import server.haengdong.domain.event.EventRepository;
//import server.haengdong.exception.HaengdongException;
//import server.haengdong.support.fixture.Fixture;
//
//class MemberActionServiceTest extends ServiceTestSupport {
//
//    @Autowired
//    private MemberActionService memberActionService;
//
//    @Autowired
//    private MemberActionRepository memberActionRepository;
//
//    @Autowired
//    private EventRepository eventRepository;
//
//    @Autowired
//    private BillRepository billActionRepository;
//
//    @Autowired
//    private BillActionDetailRepository billActionDetailRepository;
//
//    @DisplayName("현재 행사에 참여하고 있는 경우에 나갈 수 있다.")
//    @Test
//    void saveMemberActionTest() {
//        Event event = eventRepository.save(Fixture.EVENT1);
//        MemberAction memberAction = Fixture.createMemberAction(event, 1L, "망쵸", IN);
//        memberActionRepository.save(memberAction);
//
//        assertThatCode(() -> memberActionService.saveMemberAction(event.getToken(), new MemberInActionsSaveAppRequest(
//                List.of(new MemberActionSaveAppRequest("망쵸", "OUT")))))
//                .doesNotThrowAnyException();
//    }
//
//    @DisplayName("행사에서 퇴장한 경우에 입장할 수 있다.")
//    @Test
//    void saveMemberActionTest1() {
//        Event event = eventRepository.save(Fixture.EVENT1);
//        MemberAction memberActionOne = Fixture.createMemberAction(event, 1L, "망쵸", IN);
//        memberActionRepository.save(memberActionOne);
//
//        MemberAction memberActionTwo = Fixture.createMemberAction(event, 2L, "망쵸", OUT);
//        memberActionRepository.save(memberActionTwo);
//
//        assertThatCode(() -> memberActionService.saveMemberAction(event.getToken(), new MemberInActionsSaveAppRequest(
//                List.of(new MemberActionSaveAppRequest("망쵸", "IN")))))
//                .doesNotThrowAnyException();
//    }
//
//    @DisplayName("행사에 입장하지 않았을 경우 퇴장할 수 없다.")
//    @Test
//    void saveMemberActionTest2() {
//        MemberInActionsSaveAppRequest appRequest = new MemberInActionsSaveAppRequest(
//                List.of(new MemberActionSaveAppRequest("TOKEN", "OUT")));
//
//        assertThatCode(() -> memberActionService.saveMemberAction("TOKEN", appRequest))
//                .isInstanceOf(HaengdongException.class);
//    }
//
//
//    @DisplayName("행사의 전체 참여자 중에서 특정 참여자의 맴버 액션을 전부 삭제한다.")
//    @Test
//    void deleteMember() {
//        Event event = Fixture.EVENT1;
//        eventRepository.save(event);
//        MemberAction memberAction1 = Fixture.createMemberAction(event, 1L, "참여자", IN);
//        MemberAction memberAction2 = Fixture.createMemberAction(event, 2L, "토다리", IN);
//        MemberAction memberAction3 = Fixture.createMemberAction(event, 3L, "쿠키", IN);
//        MemberAction memberAction4 = Fixture.createMemberAction(event, 4L, "소하", IN);
//        MemberAction memberAction5 = Fixture.createMemberAction(event, 5L, "웨디", IN);
//        MemberAction memberAction6 = Fixture.createMemberAction(event, 6L, "참여자", OUT);
//        memberActionRepository.saveAll(
//                List.of(memberAction1, memberAction2, memberAction3, memberAction4, memberAction5, memberAction6));
//
//        Event event2 = Fixture.EVENT2;
//        eventRepository.save(event2);
//        MemberAction anotherMemberAction = Fixture.createMemberAction(event2, 1L, "참여자", IN);
//        memberActionRepository.save(anotherMemberAction);
//
//        memberActionService.deleteMember(event.getToken(), "참여자");
//
//        List<MemberAction> memberActions = memberActionRepository.findAll();
//
//        assertThat(memberActions).hasSize(5)
//                .extracting("memberName", "status")
//                .containsExactly(
//                        tuple("토다리", IN),
//                        tuple("쿠키", IN),
//                        tuple("소하", IN),
//                        tuple("웨디", IN),
//                        tuple("참여자", IN)
//                );
//    }
//
//    @DisplayName("이벤트에 속한 멤버을 삭제하면 전체 지출 내역 디테일이 초기화된다.")
//    @Test
//    void deleteMember1() {
//        Event event = Fixture.EVENT1;
//        eventRepository.save(event);
//        MemberAction memberAction1 = Fixture.createMemberAction(event, 1L, "토다리", IN);
//        MemberAction memberAction2 = Fixture.createMemberAction(event, 2L, "토다리", OUT);
//        MemberAction memberAction3 = Fixture.createMemberAction(event, 3L, "쿠키", IN);
//        MemberAction memberAction4 = Fixture.createMemberAction(event, 4L, "웨디", IN);
//        MemberAction memberAction5 = Fixture.createMemberAction(event, 5L, "감자", IN);
//        memberActionRepository.saveAll(
//                List.of(memberAction1,
//                        memberAction2,
//                        memberAction3,
//                        memberAction4,
//                        memberAction5
//                )
//        );
//        Bill billAction = Fixture.createBillAction(event, 6L, "뽕족", 100_000L);
//        billActionRepository.save(billAction);
//        BillDetail billActionDetail1 = new BillDetail(billAction, "쿠키", 40_000L, true);
//        BillDetail billActionDetail2 = new BillDetail(billAction, "웨디", 30_000L, false);
//        BillDetail billActionDetail3 = new BillDetail(billAction, "감자", 30_000L, false);
//        billActionDetailRepository.saveAll(List.of(billActionDetail1, billActionDetail2, billActionDetail3));
//
//        memberActionService.deleteMember(event.getToken(), "쿠키");
//
//        List<BillDetail> billActionDetails = billActionDetailRepository.findAllByBill(billAction);
//
//        assertThat(billActionDetails).hasSize(2)
//                .extracting("memberName", "price")
//                .containsExactlyInAnyOrder(
//                        tuple("웨디", 50_000L),
//                        tuple("감자", 50_000L)
//                );
//    }
//
//    @DisplayName("이벤트에 속한 멤버 액션을 삭제하면 이후에 기록된 해당 참여자의 모든 멤버 액션을 삭제한다.")
//    @Test
//    void deleteMemberAction() {
//        Event event = Fixture.EVENT1;
//        eventRepository.save(event);
//        MemberAction memberAction1 = Fixture.createMemberAction(event, 1L, "토다리", IN);
//        MemberAction memberAction2 = Fixture.createMemberAction(event, 2L, "토다리", OUT);
//        MemberAction memberAction3 = Fixture.createMemberAction(event, 3L, "쿠키", IN);
//        MemberAction memberAction4 = Fixture.createMemberAction(event, 4L, "웨디", IN);
//        MemberAction memberAction5 = Fixture.createMemberAction(event, 5L, "토다리", IN);
//        MemberAction memberAction6 = Fixture.createMemberAction(event, 6L, "토다리", OUT);
//        MemberAction memberAction7 = Fixture.createMemberAction(event, 7L, "쿠키", OUT);
//        memberActionRepository.saveAll(
//                List.of(memberAction1,
//                        memberAction2,
//                        memberAction3,
//                        memberAction4,
//                        memberAction5,
//                        memberAction6,
//                        memberAction7)
//        );
//
//        memberActionService.deleteMemberAction(event.getToken(), memberAction2.getId());
//        List<MemberAction> memberActions = memberActionRepository.findAll();
//
//        assertThat(memberActions).hasSize(4)
//                .extracting("id", "memberName", "status")
//                .containsExactly(
//                        tuple(memberAction1.getId(), "토다리", IN),
//                        tuple(memberAction3.getId(), "쿠키", IN),
//                        tuple(memberAction4.getId(), "웨디", IN),
//                        tuple(memberAction7.getId(), "쿠키", OUT)
//                );
//    }
//
//    @DisplayName("이벤트에 속한 멤버 액션을 삭제하면 이후 지출 내역 디테일이 초기화된다.")
//    @Test
//    void deleteMemberAction1() {
//        Event event = Fixture.EVENT1;
//        eventRepository.save(event);
//        MemberAction memberAction1 = Fixture.createMemberAction(event, 1L, "토다리", IN);
//        MemberAction memberAction2 = Fixture.createMemberAction(event, 2L, "토다리", OUT);
//        MemberAction memberAction3 = Fixture.createMemberAction(event, 3L, "쿠키", IN);
//        MemberAction memberAction4 = Fixture.createMemberAction(event, 4L, "웨디", IN);
//        MemberAction memberAction5 = Fixture.createMemberAction(event, 5L, "감자", IN);
//        memberActionRepository.saveAll(
//                List.of(memberAction1,
//                        memberAction2,
//                        memberAction3,
//                        memberAction4,
//                        memberAction5
//                )
//        );
//        Bill billAction = Fixture.createBillAction(event, 6L, "뽕족", 100_000L);
//        billActionRepository.save(billAction);
//        BillDetail billActionDetail1 = new BillDetail(billAction, "쿠키", 40_000L, true);
//        BillDetail billActionDetail2 = new BillDetail(billAction, "웨디", 30_000L, false);
//        BillDetail billActionDetail3 = new BillDetail(billAction, "감자", 30_000L, false);
//        billActionDetailRepository.saveAll(List.of(billActionDetail1, billActionDetail2, billActionDetail3));
//
//        memberActionService.deleteMemberAction(event.getToken(), memberAction2.getId());
//        List<BillDetail> billActionDetails = billActionDetailRepository.findAllByBill(billAction);
//
//        assertThat(billActionDetails).hasSize(4)
//                .extracting("memberName", "price")
//                .containsExactlyInAnyOrder(
//                        tuple("토다리", 25_000L),
//                        tuple("쿠키", 25_000L),
//                        tuple("웨디", 25_000L),
//                        tuple("감자", 25_000L)
//                );
//    }
//}
