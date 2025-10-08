import {ReplaySubject} from 'rxjs';

export class MessageHandler {

    public init(extensionReadyForMessages$: ReplaySubject<boolean>) {
        window.postMessage({type: "HELLO_FROM_CLIENT_LIB"}, "*");
        window.postMessage({type: 'CLIENT_LIB_INITIALIZED'}, '*');
        window.addEventListener("message", (event) => {
            if (event.data.type === "HELLO_FROM_CONTENT_SCRIPT") {
                window.postMessage({type: "ACK_FROM_CLIENT_LIB"}, "*");
            }
            if (event.data.type === "EXTENSION_READY_FOR_MESSAGES") {
                console.log('jest i extension ready for messages');
                // i to nie jest wysylane na stackblitzu - to troche problem, ale moze nie jest potrzebne
                // bedziemy i tak mieli wiedze czy jestesmy w iframe czy nie
                extensionReadyForMessages$.next(true);
            }

            if (event.data.type === "ACK_FROM_CONTENT_SCRIPT") {
            }
        });
    }
}
