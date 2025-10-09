"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmissionMessage = void 0;
var MessageType_1 = require("./MessageType");
var EmissionMessage = /** @class */ (function () {
    function EmissionMessage(streamId, value, sessionId) {
        this.streamId = streamId;
        this.value = value;
        this.sessionId = sessionId;
        this.type = MessageType_1.MessageType.EMISSION;
    }
    return EmissionMessage;
}());
exports.EmissionMessage = EmissionMessage;
