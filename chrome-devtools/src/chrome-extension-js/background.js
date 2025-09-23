console.log('Background script: Running');

const devToolsPorts = {};
const contentScriptPorts = {};
const delayedMessagesToDevtoolsPort = {};


function handlePortConnect(port) {
  console.log('Port connected', port.name)
  // content-script-port connectuje sie gdy strona klienta sie odpala
  // devtools-script-port i panel-port connectuja sie gdy panel dodatku jest widoczny

  if (port.name === 'content-script-port') {
    handleContentScriptPortConnect(port);
  }
  if (port.name === 'devtools-script-port') {
    handleDevtoolsPortConnected(port);
  }
}

function handleContentScriptPortConnect(port) {
  const portId = port.sender.tab.id; // TODO potrafi byc undefined
  contentScriptPorts[portId] = port;
  port.onDisconnect.addListener(() => {
    handlePortDisconnect(port, portId, contentScriptPorts)
  });
  port.onMessage.addListener((msg) => handleMessageInContentScriptPort(msg, portId));
}

function handleDevtoolsPortConnected(port) {
  console.log('Devtools port connected', port);
  port.onMessage.addListener((msg) => {
    const portId = msg.tabId;
    console.log('devtools port stworzony', portId);
    if (msg.action === 'devtools-script-port-created') {
      devToolsPorts[portId] = port;
      port.onDisconnect.addListener(() => handlePortDisconnect(port, portId, devToolsPorts));
      port.onMessage.addListener((msg) => handleMessageInDevtoolsPort(port, msg, portId));
      console.log('czy ja mam content port?', contentScriptPorts[portId]);
      contentScriptPorts[portId].postMessage({type: 'DEV_TOOLS_READY'}); // TODO tu potrafi byc undefined
      // wiec moze devtools potrafi sie przed content scriptem odpalic ale watpie w to
      if (delayedMessagesToDevtoolsPort[portId]) {
        delayedMessagesToDevtoolsPort[portId].forEach((msg) => port.postMessage(msg));
        delete delayedMessagesToDevtoolsPort[portId];
      }
    }
  });
}

function handlePortDisconnect(port, portId, parentObject) {
  if (parentObject[portId]) {
    delete parentObject[portId];
  }
}

function handleMessageInDevtoolsPort(port, msg, portId) {
  contentScriptPorts[portId].postMessage(msg);
}


function handleMessageInContentScriptPort(msg, portId) {
  const devToolsPort = devToolsPorts[portId];
  console.log('qqq msg w content script porcie', msg);
  if (devToolsPort === undefined) {
    if (delayedMessagesToDevtoolsPort[portId] === undefined) {
      delayedMessagesToDevtoolsPort[portId] = [msg];
    } else {
      delayedMessagesToDevtoolsPort[portId].push(msg);
    }
  } else {
    devToolsPort.postMessage(msg);
  }
}

chrome.runtime.onConnect.addListener(handlePortConnect);
