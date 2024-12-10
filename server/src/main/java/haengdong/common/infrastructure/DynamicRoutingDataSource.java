package haengdong.common.infrastructure;

import static org.springframework.transaction.support.TransactionSynchronizationManager.isCurrentTransactionReadOnly;

import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

@Slf4j
public class DynamicRoutingDataSource extends AbstractRoutingDataSource {

    private static final String PRIMARY = "primary";
    private static final String SECONDARY = "secondary";

    @Override
    protected Object determineCurrentLookupKey() {
        return isCurrentTransactionReadOnly() ? SECONDARY : PRIMARY;
    }
}
