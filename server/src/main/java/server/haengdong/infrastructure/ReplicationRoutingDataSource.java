package server.haengdong.infrastructure;

import java.util.List;
import java.util.Map;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.transaction.support.TransactionSynchronizationManager;

public class ReplicationRoutingDataSource extends AbstractRoutingDataSource {
    private static final String READ = "read";
    private static final String WRITE = "write";
    private final ReadOnlyDataSourceCycle<String> readOnlyDataSourceCycle = new ReadOnlyDataSourceCycle<>();

    @Override
    public void setTargetDataSources(Map<Object, Object> targetDataSources) {
        super.setTargetDataSources(targetDataSources);
        List<String> readOnlyDataSourceLookupKeys = targetDataSources.keySet()
                .stream()
                .map(String::valueOf)
                .filter(lookupKey -> lookupKey.contains(READ)).toList();
        readOnlyDataSourceCycle.setReadOnlyDataSourceLookupKeys(readOnlyDataSourceLookupKeys);
    }

    @Override
    public Object determineCurrentLookupKey() {
        return TransactionSynchronizationManager.isCurrentTransactionReadOnly()
                ? readOnlyDataSourceCycle.getReadOnlyDataSourceLookupKey()
                : WRITE;
    }
}
