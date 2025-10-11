import {MessageType} from "./MessageType";
import {Emission} from "ui";

export class EmissionMessage {
  type = MessageType.EMISSION

  constructor(
    public emission: Emission,
    public streamId: string,
    public sessionId: string
  ) {

  }

}
