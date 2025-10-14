import {Component} from '@angular/core';
import {Emission, RxVisionComponent, UiApiService} from "ui";
import {EmissionMessage} from "../message/emission-message";
import {MessageType} from "../message/MessageType";
import {SessionIdMessage} from "../message/SessionIdMessage";

declare const chrome: any;

@Component({
    selector: 'app-root',
    imports: [RxVisionComponent],
    templateUrl: './chrome-extension-ui-host-app.component.html',
    styleUrl: './chrome-extension-ui-host-app.component.scss'
})
export class ChromeExtensionUiHostAppComponent {
    port;
    sessionId: string;

    constructor(
        private readonly uiApiService: UiApiService
    ) {
        this.listenToMessages();
    }

    private listenToMessages() {
        this.port = chrome.runtime.connect({name: 'panel-port'});
        this.port.onMessage.addListener((message) => {
            this.handleMessage(message);
        });
        this.port.postMessage({type: 'panel_ready', tabId: chrome.devtools.inspectedWindow.tabId});
    }

    private handleMessage(message) {
        if (message.type === 'page_refreshed' || message.type === MessageType.CLEAR_EMISSIONS) {
            this.uiApiService.clearEmissions();
        }
        if ([MessageType.EMISSION, MessageType.EMISSION_FROM_IFRAME].includes(message.type)
            && this.sessionId === (message as EmissionMessage).sessionId) {
            const emission = Emission.fromRaw((message as EmissionMessage).emission);
            const streamId = (message as EmissionMessage).streamId;
            this.uiApiService.addEmission(emission, streamId);
        }
        if (message.type === MessageType.TAB_ID) {
            this.uiApiService.clearEmissions();
            this.sessionId = (message as SessionIdMessage).value;
        }
    }
}
