prepareScriptForIframeProxy();

function prepareScriptForIframeProxy() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('inject-into-host.js');
    script.onload = () => {
        console.log('[EXT] Injected and loaded successfully!');
        script.remove();
    };

    script.onerror = () => {
        console.error('[EXT] Failed to inject script');
    };
    (document.head || document.documentElement).appendChild(script);
}


class HandshakeManager {

    constructor() {
        this.extensionReadyForMessages = false;
        this.sendHandShakeWithClientLib();
        this.observeHandShakeWithClientLib();
    }

    observeHandShakeWithClientLib() {
        window.addEventListener("message", (message) => {
            if (message.data.type === "HELLO_FROM_CLIENT_LIB") {
                window.postMessage({type: "ACK_FROM_CONTENT_SCRIPT", from: "CONTENT_SCRIPT"}, "*");
                this.setExtensionReady();
            } else if (message.data.type === "ACK_FROM_CLIENT_LIB") {
                this.setExtensionReady();
            }
        });
    }

    sendHandShakeWithClientLib() {
        window.postMessage({type: "HELLO_FROM_CONTENT_SCRIPT"}, "*");
    }

    setExtensionReady() {
        if (!this.extensionReadyForMessages) {
            this.extensionReadyForMessages = true;
            window.postMessage({type: 'EXTENSION_READY_FOR_MESSAGES'}, '*');
        }
    }
}

class ClientMessageHandler {

    constructor() {
        this.port = chrome.runtime.connect({name: 'content-script-port'});
        this.port.onMessage.addListener(this.handleBackgroundMessage.bind(this));
        window.addEventListener("message", this.handleClientMessage.bind(this), false);
    }

    handleClientMessage(clientMessage) {
        // TODO mby different name - it's not client in iframe manner
        if (clientMessage.data.type === 'EMISSION') {
            console.log('Emission', clientMessage.data);
            this.port.postMessage(clientMessage.data);
        }
        if (clientMessage.data.type === 'emission-from-iframe-to-host-proxy') {
            this.port.postMessage(clientMessage.data);
        }
        if (clientMessage.data.type === 'CLEAR_EMISSIONS') {
            // jak jestesmy na iframe cliencie/stackblitzu to tutaj tego nie ma?
            console.log('elooooo');
            this.port.postMessage(clientMessage.data);
        }
    }

    handleBackgroundMessage(message, _sender, _sendResponse) {
        if (message.type === 'DEVTOOLS_CLICK') {
            console.log(message.data)
        }
    }
}

const handshakeManager = new HandshakeManager();
const clientMessageHandler = new ClientMessageHandler();
