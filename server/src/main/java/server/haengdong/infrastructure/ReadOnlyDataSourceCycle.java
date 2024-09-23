package server.haengdong.infrastructure;

import java.util.List;

public class ReadOnlyDataSourceCycle<T> {
    private List<T> readOnlyDataSourceLookupKeys;
    private int index = 0;

    public void setReadOnlyDataSourceLookupKeys(List<T> readOnlyDataSourceLookupKeys) {
        this.readOnlyDataSourceLookupKeys = readOnlyDataSourceLookupKeys;
    }

    public T getReadOnlyDataSourceLookupKey() {
        if (index + 1 >= readOnlyDataSourceLookupKeys.size()) {
            index = -1;
        }
        return readOnlyDataSourceLookupKeys.get(++index);
    }
}
