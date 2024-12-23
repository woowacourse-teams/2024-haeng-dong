package haengdong.presentation;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import haengdong.user.domain.Nickname;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import haengdong.event.application.response.BillAppResponse;
import haengdong.event.application.response.BillDetailAppResponse;
import haengdong.event.application.response.BillDetailsAppResponse;
import haengdong.event.application.response.MemberAppResponse;
import haengdong.event.application.response.StepAppResponse;
import haengdong.event.domain.bill.Bill;
import haengdong.event.domain.event.member.EventMember;
import haengdong.support.fixture.Fixture;

class BillControllerTest extends ControllerTestSupport {

    @DisplayName("전체 지출 내역을 조회한다.")
    @Test
    void findBills() throws Exception {
        Bill bill = Fixture.BILL1;
        List<BillAppResponse> bills = List.of(BillAppResponse.of(bill));

        EventMember eventMember = Fixture.EVENT_MEMBER_1;
        List<MemberAppResponse> members = List.of(MemberAppResponse.of(eventMember));

        StepAppResponse stepAppResponse = new StepAppResponse(bills, members);
        given(billService.findSteps(anyString())).willReturn(List.of(stepAppResponse));

        mockMvc.perform(get("/api/events/{eventId}/bills", "token"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.steps").isArray())
                .andExpect(jsonPath("$.steps[0].bills").isArray())
                .andExpect(jsonPath("$.steps[0].bills[0].id").value(bill.getId()))
                .andExpect(jsonPath("$.steps[0].bills[0].title").value(bill.getTitle()))
                .andExpect(jsonPath("$.steps[0].bills[0].price").value(bill.getPrice()))
                .andExpect(jsonPath("$.steps[0].bills[0].isFixed").value(bill.isFixed()))
                .andExpect(jsonPath("$.steps[0].members").isArray())
                .andExpect(jsonPath("$.steps[0].members[0].id").value(eventMember.getId()))
                .andExpect(jsonPath("$.steps[0].members[0].name").value(eventMember.getName().getValue()));
    }

    @DisplayName("참여자별 지출 금액을 조회한다.")
    @Test
    void findBillDetails() throws Exception {
        BillDetailsAppResponse appResponse = new BillDetailsAppResponse(
                List.of(new BillDetailAppResponse(1L, new Nickname("토다리"), 1000L, false)));
        given(billService.findBillDetails(anyString(), anyLong())).willReturn(appResponse);

        mockMvc.perform(get("/api/events/{eventId}/bills/{billId}/details", "TOKEN", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.members").isArray())
                .andExpect(jsonPath("$.members[0].id").value(1L))
                .andExpect(jsonPath("$.members[0].memberName").value("토다리"))
                .andExpect(jsonPath("$.members[0].price").value(1000L))
                .andExpect(jsonPath("$.members[0].isFixed").value(false));
    }
}
