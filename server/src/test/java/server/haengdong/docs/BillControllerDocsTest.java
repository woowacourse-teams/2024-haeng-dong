package server.haengdong.docs;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import server.haengdong.application.BillService;
import server.haengdong.application.response.BillAppResponse;
import server.haengdong.application.response.BillDetailAppResponse;
import server.haengdong.application.response.BillDetailsAppResponse;
import server.haengdong.application.response.MemberAppResponse;
import server.haengdong.application.response.StepAppResponse;
import server.haengdong.domain.action.Bill;
import server.haengdong.domain.action.Member;
import server.haengdong.presentation.BillController;
import server.haengdong.support.fixture.Fixture;

public class BillControllerDocsTest extends RestDocsSupport {

    private final BillService billService = mock(BillService.class);

    @Override
    protected Object initController() {
        return new BillController(billService);
    }

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
                .andExpect(jsonPath("$.steps[0].members[0].name").value(member.getName()))
                .andDo(document("findBills",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID")
                                )
                        )
                );
    }

    @DisplayName("참여자별 지출 금액을 조회한다.")
    @Test
    void findBillActionDetails() throws Exception {
        BillDetailsAppResponse appResponse = new BillDetailsAppResponse(
                List.of(new BillDetailAppResponse(1L, "토다리", 1000L, false)));
        given(billService.findBillDetails(anyString(), anyLong())).willReturn(appResponse);

        mockMvc.perform(get("/api/events/{eventId}/bills/{billId}/fixed", "TOKEN", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.members").isArray())
                .andExpect(jsonPath("$.members[0].id").value(1L))
                .andExpect(jsonPath("$.members[0].memberName").value("토다리"))
                .andExpect(jsonPath("$.members[0].price").value(1000L))
                .andExpect(jsonPath("$.members[0].isFixed").value(false))
                .andDo(document("findBillActionDetails",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("eventId").description("행사 ID"),
                                        parameterWithName("billId").description("지출 ID")
                                )
                        )
                );
    }
}
