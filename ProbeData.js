"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProbeData {
    constructor(nid, m, tst, rs) {
        this.nodeId = nid;
        this.mac_hash = m;
        this.timestamp = new Date(tst);
        this.rssi = rs;
    }
    sqlDateTojsDate(sdate) {
        return sdate;
    }
}
exports.ProbeData = ProbeData;
//# sourceMappingURL=ProbeData.js.map