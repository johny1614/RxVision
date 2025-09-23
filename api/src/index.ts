import {filter, ReplaySubject, take} from "rxjs";
import {EmissionHandler} from "./emission-handler";
import {MessageHandler} from "./message-handler";

export class RxVisionManager {
    private initialized = false;
    private initTime: number | undefined;
    public extensionReadyForMessages$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

    private emissionHandler: EmissionHandler = new EmissionHandler();
    private messageHandler: MessageHandler = new MessageHandler();

    public addRxVisionEmissionFromIframe(streamName: string, value: any, displayValue = value) {
        window.parent.postMessage({
            source: 'rxvision-iframe-to-host-proxy',
            payload: {streamName, value, displayValue},
        }, '*');
    }

    public addRxVisionEmission(streamName: string, value: any, displayValue = value) {
        if (!this.initialized) {
            this.init();
        }
        const emissionTime = this.getEmissionTime();
        this.extensionReadyForMessages$.pipe(
            filter(ready => ready),
            take(1)
        ).subscribe(() => {
            this.emissionHandler.addRxVisionEmissionWhenReady(streamName, value, emissionTime, displayValue);
        });
    }

    private getEmissionTime() {
        return Date.now() - this.initTime;
    }

    private init() {
        this.messageHandler.init(this.extensionReadyForMessages$);
        this.initTime = Date.now();
        this.initialized = true;
    }
}

const rxVisionManager = new RxVisionManager();

export function addRxVisionEmission(streamName: string, value: any, displayValue = value) {
    rxVisionManager.addRxVisionEmission(streamName, value, displayValue);
}

export function addRxVisionEmissionFromIframe(streamName: string, value: any, displayValue = value) {
    rxVisionManager.addRxVisionEmissionFromIframe(streamName, value, displayValue);
}