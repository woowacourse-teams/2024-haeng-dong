export type EventName = string;
export type NickName = string;
export type Password = string;

export type CreateEventArgs = {
  eventName: EventName;
  nickname: NickName;
  password: Password;
};
