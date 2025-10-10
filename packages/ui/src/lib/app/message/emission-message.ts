import {MessageType} from "./MessageType";
import {Emission} from "../emission/emission.model";

export class EmissionMessage {
  type = MessageType.EMISSION

  constructor(
    public emission: Emission,
    public streamId: string, // TODO check if this works with new lib
    public sessionId: string
  ) {

  }

}
