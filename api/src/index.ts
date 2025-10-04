import {filter, ReplaySubject, take} from "rxjs";
import {EmissionHandler} from "./emission-handler.js";
import {MessageHandler} from "./message-handler.js";

export class RxVisionManager {
    private initialized = false;
    private initTime: number | undefined | null;
    public extensionReadyForMessages$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

    private emissionHandler: EmissionHandler = new EmissionHandler();
    private messageHandler: MessageHandler = new MessageHandler();

    public addRxVisionEmission(streamName: string, value: any, displayValue = value) {
        if (!this.initialized) {
            this.init();
        }
        if (!this.initTime) {
            this.initTime = Date.now();
        }
        if (this.isInIframe()) {
            window.parent.postMessage({
                source: 'rxvision-iframe-to-host-proxy',
                payload: {streamName, value, displayValue},
            }, '*');
        } else {
            const emissionTime = this.getEmissionTime();
            this.extensionReadyForMessages$.pipe(
                filter(ready => ready),
                take(1)
            ).subscribe(() => {
                this.emissionHandler.addRxVisionEmissionWhenReady(streamName, value, emissionTime, displayValue);
            });
        }
    }

    public clearAllRxVisionEmissions(): void {
        this.initTime = null;
        if (this.isInIframe()) {
            window.parent.postMessage({
                source: 'rxvision-iframe-to-host-proxy-clear-emissions'
            }, '*');
        } else {
            window.postMessage({
                type: 'CLEAR_EMISSIONS',
                payload: {}
            });
        }
    }

    private getEmissionTime() {
        return Date.now() - this.initTime;
    }

    private init() {
        this.messageHandler.init(this.extensionReadyForMessages$);
        this.initTime = Date.now();
        this.initialized = true;
    }

    private isInIframe() {
        try {
            return window.parent !== window;
        } catch {
            return true;
        }
    }
}

const rxVisionManager = new RxVisionManager();

export function addRxVisionEmission(streamName: string, value: any, displayValue = value) {
    rxVisionManager.addRxVisionEmission(streamName, value, displayValue);
}

export function clearAllRxVisionEmissions() {
    // TODO moze jakos inaczej nazwij bo to tez czas na 0 bd ustawiac hmmm
    rxVisionManager.clearAllRxVisionEmissions();
}

export { VERSION } from './version';
