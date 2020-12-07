"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(informations, client) {
        this._informations = informations;
        this.client = client;
    }
    setCategory(category) {
        this._informations.category = category;
    }
    setPath(path) {
        this._informations.path = path;
    }
    get informations() {
        return this._informations;
    }
}
exports.Command = Command;
//# sourceMappingURL=Command.js.map