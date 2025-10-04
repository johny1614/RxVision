import {addRxVisionEmission,  clearAllRxVisionEmissions} from "rx-vision";

const streamNameElement = document.getElementById("client-stream-name") as HTMLInputElement;
const emissionNameElement = document.getElementById("client-emission-name") as HTMLInputElement;

document.getElementById("client-emit-button")!.addEventListener("click", () => {
    addRxVisionEmission(streamNameElement.value, emissionNameElement.value,emissionNameElement.value);
});

document.getElementById("client-clear-button")!.addEventListener("click", () => {
    clearAllRxVisionEmissions();
});