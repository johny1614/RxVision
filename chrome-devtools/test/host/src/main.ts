import {addRxVisionEmission} from "rx-vision";

const steamNameElement = document.getElementById("host-stream-name") as HTMLInputElement;
const emissionNameElement = document.getElementById("host-emission-name") as HTMLInputElement;

document.getElementById("host-emit-button")!.addEventListener("click", () => {
    addRxVisionEmission(steamNameElement.value, emissionNameElement.value);
});
