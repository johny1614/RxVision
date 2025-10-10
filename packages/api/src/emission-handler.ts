import {Emission} from './emission.js';
import {EmissionMessage} from './emission-message.js';

export class EmissionHandler {

    public addRxVisionEmissionWhenReady(streamName: string, value: any, emissionTime: number, displayValue = value) {
        const emission = new Emission(value, displayValue, emissionTime);
        const message = new EmissionMessage(emission, streamName);
        window.postMessage(message, '*');
    }
}
