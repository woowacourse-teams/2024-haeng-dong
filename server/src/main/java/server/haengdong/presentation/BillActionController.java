package server.haengdong.presentation;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.BillActionService;
import server.haengdong.presentation.request.BillActionsSaveRequest;

@RequiredArgsConstructor
@RestController
public class BillActionController {

    private final BillActionService billActionService;

    @PostMapping("/api/events/{token}/actions/bills")
    public ResponseEntity<Void> saveAllBillAction(
            @PathVariable String token,
            @RequestBody @Valid BillActionsSaveRequest request
    ) {
        billActionService.saveAllBillAction(token, request.toAppRequests());

        return ResponseEntity.ok()
                .build();
    }
}
