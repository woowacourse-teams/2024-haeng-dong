package server.haengdong.presentation;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import server.haengdong.application.BillActionDetailService;

@RequiredArgsConstructor
@RestController
public class BillActionDetailController {

    private final BillActionDetailService billActionDetailService;
}
