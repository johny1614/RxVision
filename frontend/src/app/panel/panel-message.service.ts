import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Emissions} from "../emission/Emissions.model";
import {MessageType} from "../message/MessageType";
import {EmissionMessage} from "../message/emission-message";
import {SessionIdMessage} from "../message/SessionIdMessage";
import {IS_DEVELOPER_MODE} from "../../isDeveloperMode";
import {Emission} from "../emission/emission.model";

declare const chrome: any;

@Injectable({
  providedIn: 'root'
})
export class PanelMessageService {
  emissions: Emissions = {};
  sessionId: string;
  port;
  private emissionsSubject$: BehaviorSubject<Emissions> = new BehaviorSubject<any>([]);
  public emissions$: Observable<Emissions> = this.emissionsSubject$.asObservable();

  constructor(
    @Inject(IS_DEVELOPER_MODE) private isDeveloperMode: boolean
  ) {
    if (!this.isDeveloperMode) {
      this.listenToMessages();
    }
  }

  addDeveloperEmission(emission: Emission, streamId: string) {
    if (this.emissions[streamId]) {
      this.emissions[streamId].push(emission);
    } else {
      this.emissions[streamId] = [emission];
    }
    this.emissionsSubject$.next(this.emissions);
  }

  private listenToMessages() {
    this.port = chrome.runtime.connect({name: 'panel-port'});
    this.port.onMessage.addListener((message) => {
      this.handleMessage(message);
    });
    this.port.postMessage({type: 'panel_ready', tabId: chrome.devtools.inspectedWindow.tabId});
  }

  private handleMessage(message) {
    if (message.type === 'page_refreshed') {
      this.emissions = {};
      this.emissionsSubject$.next(this.emissions);
      return;
    }

    if ([MessageType.EMISSION, MessageType.EMISSION_FROM_IFRAME].includes(message.type)
      && this.sessionId === (message as EmissionMessage).sessionId) {
      const emission = (message as EmissionMessage).emission;
      const streamId = (message as EmissionMessage).streamId;
      if (this.emissions[streamId]) {
        this.emissions[streamId].push(emission);
      } else {
        this.emissions[streamId] = [emission];
      }
    }
    if (message.type === MessageType.TAB_ID) {
      this.sessionId = (message as SessionIdMessage).value;
      this.emissions = {};
    }
    if(message.type === MessageType.CLEAR_EMISSIONS) {
      this.emissions = {};
    }
    this.emissionsSubject$.next(this.emissions);
  }

  emitEmissionClick(value: any) {
    if (this.isDeveloperMode) {
      console.log(value);
    } else {
      this.port.postMessage({type: 'DEVTOOLS_CLICK', data: value});
    }
  }
}
