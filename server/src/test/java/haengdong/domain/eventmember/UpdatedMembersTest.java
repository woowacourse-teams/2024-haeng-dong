package haengdong.domain.eventmember;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import haengdong.event.domain.event.Event;
import haengdong.event.domain.event.member.EventMember;
import haengdong.event.domain.event.member.UpdatedMembers;
import haengdong.common.exception.HaengdongException;

class UpdatedMembersTest {

    @DisplayName("이벤트 이름들은 중복될 수 없다.")
    @Test
    void validateNameUnique() {
        Event event = Event.createByGuest("행동대장 회식", "1231415jaksdf", 1L);
        List<EventMember> eventMembers = List.of(
                new EventMember(1L, event, "고구마", false),
                new EventMember(2L, event, "감자", false),
                new EventMember(3L, event, "감자", false)
        );

        assertThatThrownBy(() -> new UpdatedMembers(eventMembers))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("중복된 참여 인원 이름 변경 요청이 존재합니다.");
    }

    @DisplayName("이벤트 회원들은 중복될 수 없다.")
    @Test
    void validateMemberUnique() {
        Event event = Event.createByGuest("행동대장 회식", "1231415jaksdf", 1L);
        EventMember eventMember1 = new EventMember(1L, event, "고구마", false);
        EventMember eventMember2 = new EventMember(2L, event, "감자", false);
        List<EventMember> eventMembers = List.of(eventMember1, eventMember2, eventMember2);


        assertThatThrownBy(() -> new UpdatedMembers(eventMembers))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("중복된 참여 인원 이름 변경 요청이 존재합니다.");
    }

    @DisplayName("이벤트 이름들로 이벤트 참여자들을 생성한다.")
    @Test
    void create() {
        Event event = Event.createByGuest("행동대장 회식", "1231415jaksdf", 1L);
        EventMember eventMember1 = new EventMember(1L, event, "고구마", false);
        EventMember eventMember2 = new EventMember(2L, event, "감자", false);
        EventMember eventMember3 = new EventMember(3L, event, "당근", false);
        List<EventMember> eventMembers = List.of(eventMember1, eventMember2, eventMember3);

        UpdatedMembers eventUpdatedMembers = new UpdatedMembers(eventMembers);
        assertThat(eventUpdatedMembers.getMembers()).hasSize(3)
                .containsExactlyInAnyOrder(eventMember1, eventMember2, eventMember3);
    }

    @DisplayName("이벤트의 참여자들 전체가 존재하지 않으면 업데이트할 수 없다.")
    @Test
    void validateUpdatedMembersExist() {
        Event event = Event.createByGuest("행동대장 회식", "1231415jaksdf", 1L);
        EventMember eventMember1 = new EventMember(1L, event, "고구마", false);
        EventMember eventMember2 = new EventMember(2L, event, "감자", false);
        EventMember eventMember3 = new EventMember(3L, event, "당근", false);
        EventMember eventMember4 = new EventMember(4L, event, "양파", false);
        List<EventMember> eventMembers = List.of(eventMember1, eventMember2, eventMember3, eventMember4);

        EventMember updateEventMember1 = new EventMember(1L, event, "토다리", false);
        EventMember updateEventMember2 = new EventMember(2L, event, "쿠키", false);
        EventMember updateEventMember3 = new EventMember(3L, event, "백호", false);
        UpdatedMembers updatedMembers = new UpdatedMembers(List.of(
                updateEventMember1, updateEventMember2, updateEventMember3));

        assertThatThrownBy(() -> updatedMembers.validateUpdatable(eventMembers))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("업데이트 요청된 참여자 ID 목록과 기존 행사 참여자 ID 목록이 일치하지 않습니다.");
    }

    @DisplayName("업데이트할 이름 중에 기존 이벤트의 참여자들의 이름과 중복되면 업데이트할 수 없다.")
    @Test
    void validateUpdatedNamesUnique() {
        Event event = Event.createByGuest("행동대장 회식", "1231415jaksdf", 1L);
        EventMember eventMember1 = new EventMember(1L, event, "고구마", false);
        EventMember eventMember2 = new EventMember(2L, event, "감자", false);
        EventMember eventMember3 = new EventMember(3L, event, "당근", false);
        EventMember eventMember4 = new EventMember(4L, event, "양파", false);
        List<EventMember> eventMembers = List.of(eventMember1, eventMember2, eventMember3, eventMember4);

        EventMember updateEventMember1 = new EventMember(1L, event, "토다리", false);
        EventMember updateEventMember2 = new EventMember(2L, event, "쿠키", false);
        EventMember updateEventMember3 = new EventMember(3L, event, "백호", false);
        EventMember updateEventMember4 = new EventMember(4L, event, "감자", false);
        UpdatedMembers updatedMembers = new UpdatedMembers(List.of(
                updateEventMember1, updateEventMember2, updateEventMember3, updateEventMember4));

        assertThatThrownBy(() -> updatedMembers.validateUpdatable(eventMembers))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("행사에 중복된 참여자 이름이 존재합니다.");
    }

    @DisplayName("이벤트의 참여자들 전체를 업데이트 검증한다.")
    @Test
    void validateUpdatable() {
        Event event = Event.createByGuest("행동대장 회식", "1231415jaksdf", 1L);
        EventMember eventMember1 = new EventMember(1L, event, "고구마", false);
        EventMember eventMember2 = new EventMember(2L, event, "감자", false);
        EventMember eventMember3 = new EventMember(3L, event, "당근", false);
        EventMember eventMember4 = new EventMember(4L, event, "양파", false);
        List<EventMember> eventMembers = List.of(eventMember1, eventMember2, eventMember3, eventMember4);

        EventMember updateEventMember1 = new EventMember(1L, event, "토다리", false);
        EventMember updateEventMember2 = new EventMember(2L, event, "쿠키", false);
        EventMember updateEventMember3 = new EventMember(3L, event, "백호", false);
        EventMember updateEventMember4 = new EventMember(4L, event, "망쵸", false);
        UpdatedMembers updatedMembers = new UpdatedMembers(List.of(
                updateEventMember1, updateEventMember2, updateEventMember3, updateEventMember4));

        assertThatCode(() -> updatedMembers.validateUpdatable(eventMembers))
                .doesNotThrowAnyException();
    }
}
