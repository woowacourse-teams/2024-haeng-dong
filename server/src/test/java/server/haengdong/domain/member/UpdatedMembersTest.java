package server.haengdong.domain.member;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import server.haengdong.domain.event.Event;
import server.haengdong.exception.HaengdongException;

class UpdatedMembersTest {

    @DisplayName("이벤트 이름들은 중복될 수 없다.")
    @Test
    void validateNameUnique() {
        Event event = new Event("행동대장 회식", "1234", "1231415jaksdf");
        List<Member> members = List.of(
                new Member(1L, event, "고구마", false),
                new Member(2L, event, "감자", false),
                new Member(3L, event, "감자", false)
        );

        assertThatThrownBy(() -> new UpdatedMembers(members))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("중복된 참여 인원 이름 변경 요청이 존재합니다.");
    }

    @DisplayName("이벤트 회원들은 중복될 수 없다.")
    @Test
    void validateMemberUnique() {
        Event event = new Event("행동대장 회식", "1234", "1231415jaksdf");
        Member member1 = new Member(1L, event, "고구마", false);
        Member member2 = new Member(2L, event, "감자", false);
        List<Member> members = List.of(member1, member2, member2);


        assertThatThrownBy(() -> new UpdatedMembers(members))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("중복된 참여 인원 이름 변경 요청이 존재합니다.");
    }

    @DisplayName("이벤트 이름들로 이벤트 참여자들을 생성한다.")
    @Test
    void create() {
        Event event = new Event("행동대장 회식", "1234", "1231415jaksdf");
        Member member1 = new Member(1L, event, "고구마", false);
        Member member2 = new Member(2L, event, "감자", false);
        Member member3 = new Member(3L, event, "당근", false);
        List<Member> members = List.of(member1, member2, member3);

        UpdatedMembers eventUpdatedMembers = new UpdatedMembers(members);
        assertThat(eventUpdatedMembers.getMembers()).hasSize(3)
                .containsExactlyInAnyOrder(member1, member2, member3);
    }

    @DisplayName("이벤트의 참여자들 전체가 존재하지 않으면 업데이트할 수 없다.")
    @Test
    void validateUpdatedMembersExist() {
        Event event = new Event("행동대장 회식", "1234", "1231415jaksdf");
        Member member1 = new Member(1L, event, "고구마", false);
        Member member2 = new Member(2L, event, "감자", false);
        Member member3 = new Member(3L, event, "당근", false);
        Member member4 = new Member(4L, event, "양파", false);
        List<Member> members = List.of(member1, member2, member3, member4);

        Member updateMember1 = new Member(1L, event, "토다리", false);
        Member updateMember2 = new Member(2L, event, "쿠키", false);
        Member updateMember3 = new Member(3L, event, "백호", false);
        UpdatedMembers updatedMembers = new UpdatedMembers(List.of(updateMember1, updateMember2, updateMember3));

        assertThatThrownBy(() -> updatedMembers.validateUpdateAble(members))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("업데이트 요청된 참여자 ID 목록과 기존 행사 참여자 ID 목록이 일치하지 않습니다.");
    }

    @DisplayName("업데이트할 이름 중에 기존 이벤트의 참여자들의 이름과 중복되면 업데이트할 수 없다.")
    @Test
    void validateUpdatedNamesUnique() {
        Event event = new Event("행동대장 회식", "1234", "1231415jaksdf");
        Member member1 = new Member(1L, event, "고구마", false);
        Member member2 = new Member(2L, event, "감자", false);
        Member member3 = new Member(3L, event, "당근", false);
        Member member4 = new Member(4L, event, "양파", false);
        List<Member> members = List.of(member1, member2, member3, member4);

        Member updateMember1 = new Member(1L, event, "토다리", false);
        Member updateMember2 = new Member(2L, event, "쿠키", false);
        Member updateMember3 = new Member(3L, event, "백호", false);
        Member updateMember4 = new Member(4L, event, "감자", false);
        UpdatedMembers updatedMembers = new UpdatedMembers(List.of(updateMember1, updateMember2, updateMember3, updateMember4));

        assertThatThrownBy(() -> updatedMembers.validateUpdateAble(members))
                .isInstanceOf(HaengdongException.class)
                .hasMessage("행사에 중복된 참여자 이름이 존재합니다.");
    }

    @DisplayName("이벤트의 참여자들 전체를 업데이트 검증한다.")
    @Test
    void validateUpdateAble() {
        Event event = new Event("행동대장 회식", "1234", "1231415jaksdf");
        Member member1 = new Member(1L, event, "고구마", false);
        Member member2 = new Member(2L, event, "감자", false);
        Member member3 = new Member(3L, event, "당근", false);
        Member member4 = new Member(4L, event, "양파", false);
        List<Member> members = List.of(member1, member2, member3, member4);

        Member updateMember1 = new Member(1L, event, "토다리", false);
        Member updateMember2 = new Member(2L, event, "쿠키", false);
        Member updateMember3 = new Member(3L, event, "백호", false);
        Member updateMember4 = new Member(4L, event, "망쵸", false);
        UpdatedMembers updatedMembers = new UpdatedMembers(List.of(updateMember1, updateMember2, updateMember3, updateMember4));

        assertThatCode(() -> updatedMembers.validateUpdateAble(members))
                .doesNotThrowAnyException();
    }
}
