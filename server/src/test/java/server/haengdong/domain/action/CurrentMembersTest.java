package server.haengdong.domain.action;

import static org.assertj.core.api.Assertions.assertThat;
import static server.haengdong.domain.action.MemberActionStatus.IN;
import static server.haengdong.domain.action.MemberActionStatus.OUT;

import java.util.List;
import java.util.Set;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import server.haengdong.domain.event.Event;

class CurrentMembersTest {

    @DisplayName("인원 변동 이력으로 현재 참여 인원을 계산한다.")
    @Test
    void of() {
        Event event = new Event("test", "TOKEN");
        List<MemberAction> memberActions = List.of(
                new MemberAction(new Action(event, 1L), "망쵸", IN, 1L),
                new MemberAction(new Action(event, 2L), "백호", IN, 1L),
                new MemberAction(new Action(event, 3L), "백호", OUT, 1L),
                new MemberAction(new Action(event, 4L), "웨디", IN, 1L)
        );

        CurrentMembers currentMembers = CurrentMembers.of(memberActions);

        assertThat(currentMembers.getMembers())
                .containsExactlyInAnyOrder("망쵸", "웨디");
    }

    @DisplayName("인원 변동 액션의 상태가 IN이면 현재 인원에 추가한다.")
    @Test
    void addMemberAction1() {
        CurrentMembers currentMembers = new CurrentMembers();
        Event event = new Event("이벤트", "token");
        MemberAction memberAction = new MemberAction(new Action(event, 1L), "웨디", IN, 1L);

        CurrentMembers addedCurrentMembers = currentMembers.addMemberAction(memberAction);
        Set<String> members = addedCurrentMembers.getMembers();

        assertThat(members).hasSize(1)
                .containsExactly("웨디");
    }

    @DisplayName("인원 변동 액션의 상태가 OUT이면 현재 인원에서 제외한다.")
    @Test
    void addMemberAction2() {
        Event event = new Event("이벤트", "token");
        MemberAction memberAction1 = new MemberAction(new Action(event, 1L), "웨디", IN, 1L);
        CurrentMembers currentMembers = new CurrentMembers().addMemberAction(memberAction1);
        MemberAction memberAction2 = new MemberAction(new Action(event, 1L), "웨디", OUT, 1L);

        CurrentMembers addedCurrentMembers = currentMembers.addMemberAction(memberAction2);

        assertThat(addedCurrentMembers.getMembers()).hasSize(0);
    }
}
