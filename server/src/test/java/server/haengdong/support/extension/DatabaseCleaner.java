package server.haengdong.support.extension;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
class DatabaseCleaner {

    private static final String REFERENTIAL_FORMAT = "set referential_integrity %b;";
    private static final String TRUNCATE_FORMAT = "truncate table %s restart identity;";

    @PersistenceContext
    private EntityManager em;
    private String truncateTablesQuery;

    @PostConstruct
    public void createTruncateQuery() {
        List<String> tableNames = getTableNames();
        StringBuilder stringBuilder = new StringBuilder();

        for (String tableName : tableNames) {
            String truncateQuery = String.format(TRUNCATE_FORMAT, tableName);
            stringBuilder.append(truncateQuery);
        }
        truncateTablesQuery = stringBuilder.toString();
    }

    private List<String> getTableNames() {
        String sql = """
                select table_name
                from information_schema.tables
                where table_schema = 'public'
                """;
        return em.createNativeQuery(sql).getResultList();
    }

    @Transactional
    public void clear() {
        em.clear();
        truncate();
    }

    private void truncate() {
        em.createNativeQuery(String.format(REFERENTIAL_FORMAT, false)).executeUpdate();
        em.createNativeQuery(truncateTablesQuery).executeUpdate();
        em.createNativeQuery(String.format(REFERENTIAL_FORMAT, true)).executeUpdate();
    }
}
