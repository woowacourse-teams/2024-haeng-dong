export type WithEventId<P = unknown> = P & {
  eventId: string;
};

export type WithBillId<P = unknown> = P & {
  billId: number;
};
