import {MessageType} from "./MessageType";

export class SessionIdMessage {
  type = MessageType.TAB_ID;

  constructor(public readonly value: string) {
  }
}
