package server.haengdong.presentation;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.BillActionDetailService;
import server.haengdong.presentation.request.BillActionDetailsUpdateRequest;

@RequiredArgsConstructor
@RestController
public class BillActionDetailController {

    private final BillActionDetailService billActionDetailService;

    @PutMapping("/api/events/{eventId}/bill-actions/{actionId}/fixed")
    public ResponseEntity<Void> updateBillActionDetails(
            @PathVariable("eventId") String token,
            @PathVariable("actionId") Long actionId,
            @Valid @RequestBody BillActionDetailsUpdateRequest request
    ) {
        billActionDetailService.updateBillActionDetails(token, actionId, request.toAppRequest());

        return ResponseEntity.ok().build();
    }
}
