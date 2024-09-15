package server.haengdong.domain.event;

import java.util.Arrays;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

public enum Bank {
    WOORI_BANK("우리은행"),
    JEIL_BANK("제일은행"),
    SHINHAN_BANK("신한은행"),
    KB_BANK("KB국민은행"),
    HANA_BANK("하나은행"),
    CITI_BANK("시티은행"),
    IM_BANK("IM뱅크"),
    BUSAN_BANK("부산은행"),
    GYEONGNAM_BANK("경남은행"),
    GWANGJU_BANK("광주은행"),
    JEONBUK_BANK("전북은행"),
    JEJU_BANK("제주은행"),
    IBK_BANK("기업은행"),
    KDB_BANK("산업은행"),
    SUHYUP_BANK("수협은행"),
    NH_BANK("농협은행"),
    SAEMAUL_BANK("새마을금고"),
    POST_BANK("우체국은행"),
    SHINHYEOP_BANK("신협은행"),
    SBI_SAVINGS_BANK("SBI저축"),
    KAKAO_BANK("카카오뱅크"),
    TOSS_BANK("토스뱅크"),
    K_BANK("케이뱅크");

    private final String name;

    Bank(String name) {
        this.name = name;
    }

    public static void isExists(String bankName) {
        Arrays.stream(Bank.values())
                .filter(bank -> bank.name.equals(bankName))
                .findFirst()
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.BANK_NAME_INVALID));
    }

    public static String getSupportedBanks() {
        return Arrays.stream(Bank.values())
                .map(Bank::getName)
                .reduce((bank1, bank2) -> bank1 + ", " + bank2)
                .orElse("지원하는 은행이 없습니다.");
    }

    public String getName() {
        return name;
    }
}
