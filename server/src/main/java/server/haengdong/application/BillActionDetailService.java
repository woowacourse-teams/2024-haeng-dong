package server.haengdong.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.haengdong.domain.action.BillActionRepository;

@RequiredArgsConstructor
@Service
public class BillActionDetailService {

    private final BillActionRepository billActionRepository;
}
