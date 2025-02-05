type BankImage = {
  name: string;
  iconId: BankIconId;
  displayName: string;
};

export type BankIconId =
  | 'bank1_woori'
  | 'bank2_sc'
  | 'bank3_shinhan'
  | 'bank4_kb'
  | 'bank5_hana'
  | 'bank6_citi'
  | 'bank7_im'
  | 'bank8_bnk'
  | 'bank9_kj'
  | 'bank10_ibk'
  | 'bank11_kdb'
  | 'bank12_suhyup'
  | 'bank13_nh'
  | 'bank14_smg'
  | 'bank15_epost'
  | 'bank16_shinhyup'
  | 'bank17_sbi'
  | 'bank18_kakao'
  | 'bank19_toss'
  | 'bank20_kbank';

const BANKS: BankImage[] = [
  {name: '우리은행', displayName: '우리은행', iconId: 'bank1_woori'},
  {name: 'SC제일은행', displayName: '제일은행', iconId: 'bank2_sc'},
  {name: '신한은행', displayName: '신한은행', iconId: 'bank3_shinhan'},
  {name: 'KB국민은행', displayName: 'KB국민은행', iconId: 'bank4_kb'},
  {name: '하나은행', displayName: '하나은행', iconId: 'bank5_hana'},
  {name: '씨티은행', displayName: '씨티은행', iconId: 'bank6_citi'},
  {name: 'IM뱅크', displayName: 'IM뱅크', iconId: 'bank7_im'},
  {name: '부산은행', displayName: '부산은행', iconId: 'bank8_bnk'},
  {name: '경남은행', displayName: '경남은행', iconId: 'bank8_bnk'},
  {name: '광주은행', displayName: '광주은행', iconId: 'bank9_kj'},
  {name: '전북은행', displayName: '전북은행', iconId: 'bank9_kj'},
  {name: '제주은행', displayName: '제주은행', iconId: 'bank3_shinhan'},
  {name: 'IBK기업은행', displayName: '기업은행', iconId: 'bank10_ibk'},
  {name: 'KDB산업은행', displayName: '산업은행', iconId: 'bank11_kdb'},
  {name: '수협은행', displayName: '수협은행', iconId: 'bank12_suhyup'},
  {name: 'NH농협', displayName: '농협은행', iconId: 'bank13_nh'},
  {name: '새마을금고', displayName: '새마을금고', iconId: 'bank14_smg'},
  {name: '우체국은행', displayName: '우체국은행', iconId: 'bank15_epost'},
  {name: '신협은행', displayName: '신협은행', iconId: 'bank16_shinhyup'},
  {name: 'SBI저축', displayName: 'SBI저축', iconId: 'bank17_sbi'},
  {name: '카카오뱅크', displayName: '카카오뱅크', iconId: 'bank18_kakao'},
  {name: '토스뱅크', displayName: '토스뱅크', iconId: 'bank19_toss'},
  {name: '케이뱅크', displayName: '케이뱅크', iconId: 'bank20_kbank'},
] as const;

export default BANKS;
