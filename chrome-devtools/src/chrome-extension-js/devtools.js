let port;
let panelPort;

console.log('Devtools is up with window', window)

chrome.runtime.onConnect.addListener((connectedPort) => {
  if (connectedPort.name === 'panel-port') {
    connectedPort.onMessage.addListener((message) => {
      if (message.type === 'panel_ready' && message.tabId === chrome.devtools.inspectedWindow.tabId) {
        assignPanelPort(connectedPort);
        createPort();
      }
    })
  }
});

chrome.devtools.panels.create("RxVision", "elo.png", "panel.html", function (panel) {
  chrome.devtools.network.onNavigated.addListener(function (url) {
    try {
      if (panelPort) {
        panelPort.postMessage({type: 'page_refreshed', url}); // TODO potrafi sie wywalic przy kompilacji bo undefined jest potencjalnie?
      }
    } catch (e) {
      console.log('couldnt refresh idk why', e)
    }
  });
});

function assignPanelPort(connectedPort) {
  panelPort = connectedPort;
  panelPort.onMessage.addListener((message) => {
    if (message.type === 'DEVTOOLS_CLICK') {
      port.postMessage(message)
    }
  });
}

function createPort() {
  const tabId = chrome.devtools.inspectedWindow.tabId;
  port = chrome.runtime.connect({name: `devtools-script-port`});
  console.log('devtools port created!');
  port.postMessage({action: 'devtools-script-port-created', tabId});
  port.onMessage.addListener((message) => {
    panelPort.postMessage(message);
  });
  port.onDisconnect.addListener(() => {
    console.log('devtools port disconnected its goooooone ahhh');
  //   TODO zapewne przy refreshu musi wstac jeszcze raz albo dluzej zyc xd?
  });
  startHeartbeat();
}

let hb;
function startHeartbeat() {
  clearInterval(hb);
  hb = setInterval(() => {
    try {
      port?.postMessage({ type: 'PING', tabId: chrome.devtools.inspectedWindow.tabId, t: Date.now() });
    } catch (e) {
      console.warn('heartbeat failed', e);
    }
  }, 20000);
}

