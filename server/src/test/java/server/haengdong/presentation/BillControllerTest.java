package server.haengdong.presentation;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import server.haengdong.application.response.BillAppResponse;
import server.haengdong.application.response.MemberAppResponse;
import server.haengdong.application.response.StepAppResponse;
import server.haengdong.domain.action.Bill;
import server.haengdong.domain.action.Member;
import server.haengdong.support.fixture.Fixture;

public class BillControllerTest extends ControllerTestSupport {

    @DisplayName("전체 지출 내역을 조회한다.")
    @Test
    void findBills() throws Exception {
        Bill bill = Fixture.BILL1;
        List<BillAppResponse> bills = List.of(BillAppResponse.of(bill));

        Member member = Fixture.MEMBER1;
        List<MemberAppResponse> members = List.of(MemberAppResponse.of(member));

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
                .andExpect(jsonPath("$.steps[0].members[0].id").value(member.getId()))
                .andExpect(jsonPath("$.steps[0].members[0].name").value(member.getName()));
    }
}