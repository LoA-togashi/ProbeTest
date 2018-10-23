"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProbePromise_1 = require("./ProbePromise");
var pPromise = new ProbePromise_1.ProbePromise();
var urls = ["pr1.html", "pr2.html"];
//var urls = [ "pr1.html" ];
//pPromise.getProbe(urls);
pPromise.searchProbe("12:34:56:78:90:12")
    .then(function (mpArr) {
    console.log(mpArr);
});
//# sourceMappingURL=app.js.map