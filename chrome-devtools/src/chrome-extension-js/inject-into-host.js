console.log('[Injected] Script loaded!');

let initialized = false;
let initTime;

listenForIframeToHostProxyMessages();

function listenForIframeToHostProxyMessages() {
  window.addEventListener('message', (event) => {
    if (event?.data?.source === 'rxvision-iframe-to-host-proxy') {
      if (!initialized) {
        initialized = true;
        initTime = Date.now();
      }
      const {displayValue, streamName, value} = event.data.payload;
      const time = getEmissionTime();
      const emission = {displayValue, streamName, value, time};
      const message = {emission, type: 'emission-from-iframe-to-host-proxy', streamId: streamName};
      window.postMessage(message, '*');
    }
  });

}

function getEmissionTime() {
  return Date.now() - initTime;
}
