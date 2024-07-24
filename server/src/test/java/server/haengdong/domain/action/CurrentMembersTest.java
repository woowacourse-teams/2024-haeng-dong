package server.haengdong.domain.action;

import static org.assertj.core.api.Assertions.assertThat;
import static server.haengdong.domain.action.MemberActionStatus.IN;
import static server.haengdong.domain.action.MemberActionStatus.OUT;

import java.util.List;
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
}
