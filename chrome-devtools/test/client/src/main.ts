import {addRxVisionEmissionFromIframe} from "rx-vision";

const streamNameElement = document.getElementById("client-stream-name") as HTMLInputElement;
const emissionNameElement = document.getElementById("client-emission-name") as HTMLInputElement;

document.getElementById("client-emit-button")!.addEventListener("click", () => {
    addRxVisionEmissionFromIframe(streamNameElement.value, emissionNameElement.value);
});
