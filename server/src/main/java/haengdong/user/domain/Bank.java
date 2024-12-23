package haengdong.user.domain;

import java.util.Arrays;
import haengdong.common.exception.HaengdongErrorCode;
import haengdong.common.exception.HaengdongException;

public enum Bank {
    WOORI_BANK("우리은행"),
    JEIL_BANK("SC제일은행"),
    SHINHAN_BANK("신한은행"),
    KB_BANK("KB국민은행"),
    HANA_BANK("하나은행"),
    CITI_BANK("씨티은행"),
    IM_BANK("IM뱅크"),
    BUSAN_BANK("부산은행"),
    GYEONGNAM_BANK("경남은행"),
    GWANGJU_BANK("광주은행"),
    JEONBUK_BANK("전북은행"),
    JEJU_BANK("제주은행"),
    IBK_BANK("IBK기업은행"),
    KDB_BANK("KDB산업은행"),
    SUHYUP_BANK("수협은행"),
    NH_BANK("NH농협"),
    SAEMAUL_BANK("새마을금고"),
    POST_BANK("우체국은행"),
    SHINHYEOP_BANK("신협은행"),
    SBI_SAVINGS_BANK("SBI저축"),
    KAKAO_BANK("카카오뱅크"),
    TOSS_BANK("토스뱅크"),
    K_BANK("케이뱅크"),
    ;

    private final String name;

    Bank(String name) {
        this.name = name;
    }

    public static Bank of(String name) {
        return Arrays.stream(Bank.values())
                .filter(bank -> bank.name.equals(name))
                .findFirst()
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.BANK_NAME_INVALID, getSupportedBanks()));
    }

    private static String getSupportedBanks() {
        return Arrays.stream(Bank.values())
                .map(Bank::getName)
                .reduce((bank1, bank2) -> bank1 + ", " + bank2)
                .orElse("지원하는 은행이 없습니다.");
    }

    public String getName() {
        return name;
    }
}
