import {ProbePromise} from './ProbePromise';
import {ProbeData} from './ProbeData';

var pPromise = new ProbePromise();
var urls = [ "pr1.html", "pr2.html" ];
//var urls = [ "pr1.html" ];

//pPromise.getProbe(urls);
pPromise.searchProbe("12:34:56:78:90:12")
            .then( function(mpArr){
              console.log(mpArr);
            });
