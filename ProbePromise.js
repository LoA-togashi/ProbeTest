"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProbeData_1 = require("./ProbeData");
const xmlhttprequest_1 = require("xmlhttprequest");
const fs = require("fs");
const crypto = require("crypto");
class ProbePromise {
    constructor() {
    }
    createProbeArray(lines) {
        console.log(this.probeArray);
        /*if(lines.length > 0){
          for(let line of lines){
            let elems = line.split(',');
          
            let time = elems[0];
            let mac = this.hash.update(elems[1]);
            let rssi = Number(elems[2]);
            let id = 0;
    
            let data = new ProbeData(id, mac, time, rssi);
            this.probeArray.push(data);
          }
        }*/
    }
    getProbeHtml(url) {
        return new Promise(function (resolve, reject) {
            console.log("url : " + url);
            //ここでhttprequest->resolve->thenの処理をするとコールバックが受けられる
            let xhr = new xmlhttprequest_1.XMLHttpRequest();
            xhr.onload = function () {
                //console.log("onload");  
                if (xhr.status == 200) {
                    console.log("200 : " + url);
                    resolve(xhr.responseText);
                }
                else {
                    console.log(xhr.status + " : " + url);
                    reject();
                }
            };
            xhr.open('GET', "http://www.google.co.jp");
            xhr.send();
            xhr.onerror = function (event) {
                console.log(event);
            };
        });
    }
    getProbeFile(fname) {
        return new Promise(function (resolve, reject) {
            console.log(fname);
            let data = fs.readFile(fname, function (err, data) {
                if (err) {
                    console.log(err);
                    resolve("");
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    getProbe(urls) {
        let ret = [];
        let darr = [];
        this.probeArray = [];
        console.log(this.probeArray);
        //    Promise.all( urls.map( this.getProbeHtml ) )
        Promise.all(urls.map(this.getProbeFile))
            .then(function (results) {
            for (let result of results) {
                let lines = result.toString().split("\n");
                for (let line of lines) {
                    if (line.length > 0) {
                        console.log("return : " + line);
                        ret.push(line);
                    }
                }
                console.log("----------");
            }
        }).then(function () {
            console.log(ret);
            //              this.createProbeArray(ret); 
            if (ret.length > 0) {
                for (let line of ret) {
                    let elems = line.split(',');
                    let time = elems[0];
                    let hash = crypto.createHash('sha512');
                    hash.update(elems[1]);
                    let mac = hash.digest('base64');
                    let rssi = Number(elems[2]);
                    let id = 0;
                    let data = new ProbeData_1.ProbeData(id, mac, time, rssi);
                    darr.push(data);
                    //this.probeArray.push(data);
                }
            }
            console.log(darr);
        }).catch(function (err) {
            console.log(err);
        });
    }
    searchProbe(mac) {
        let macProbe = this.probeArray.filter(function (data) {
            if (data.mac == mac)
                return true;
        });
    }
}
exports.ProbePromise = ProbePromise;
//# sourceMappingURL=ProbePromise.js.map