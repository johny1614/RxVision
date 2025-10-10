export class EmissionMessage {
    type = 'EMISSION';

    constructor(public emission,
                public streamId) {
    }
}
