import {ProbePromise} from './ProbePromise';
import {ProbeData} from './ProbeData';

var pPromise = new ProbePromise();
var urls = [ "pr1.html", "pr2.html" ];
var pArray: ProbeData[];
//var urls = [ "pr1.html" ];

pPromise.getProbe(urls)
          .then (function (pArr){
            return pArr;

          }).then( function (pArr){
            pPromise.searchProbe("12:34:56:78:90:12")
                    .then( function(mpArr){
                      console.log("-----------");
                      console.log(pArr);
                      console.log("-----------");

                      console.log(mpArr);
            });
          });



