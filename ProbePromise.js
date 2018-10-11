"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProbePromise {
    constructor() {
    }
    getProbe(urls) {
        var pArray = [];
        var ret = [];
        for (let url of urls) {
            var promise = new Promise(function (resolve, reject) {
                resolve(url);
            });
            pArray.push(promise);
            console.log("push promise for " + url);
        }
        Promise.all(pArray)
            .then(function (results) {
            for (let result of results) {
                console.log("result : " + result);
                ret.push(result);
            }
            console.log("return");
        });
    }
}
exports.ProbePromise = ProbePromise;
//# sourceMappingURL=ProbePromise.js.map