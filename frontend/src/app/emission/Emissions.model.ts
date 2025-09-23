import {Emission} from "./emission.model";

export interface Emissions {
  [streamId: string]: Array<Emission>;
}
