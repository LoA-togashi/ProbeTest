import {ProbePromise} from './ProbePromise';
import {ProbeData} from './ProbeData';

var pPromise = new ProbePromise();
var urls = [ "pr1.html", "pr2.html" ];
//var urls = [ "pr1.html" ];

pPromise.getProbe(urls);

//var pData = new ProbeData( 123, "ff:ff:ff:ff:ff:ff", "2018-10-11 10:10:50", -70 );
//console.log(pData.timestamp);

//var str = "abc,def,gth";
//var sArr = str.split(',');

//for( let s of sArr ){
//	console.log(s);
//}
