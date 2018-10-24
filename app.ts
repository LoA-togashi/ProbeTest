import {ProbePromise} from './ProbePromise';
import {ProbeData} from './ProbeData';

var pPromise = new ProbePromise();
var urls = [ "pr1.html", "pr2.html" ];
var pArray: ProbeData[];
//var urls = [ "pr1.html" ];

function getMaxRssiData( data: ProbeData[]): ProbeData[]{
  let mrData = [];
  for (let pd of data){
    let idx = mrData.findIndex( d => d.mac_hash === pd.mac_hash );

    if( idx == -1) mrData.push(pd);
    else if( mrData[idx].rssi < pd.rssi ) mrData[idx] = pd;
  }
  
  return mrData;
}

function prbLoop(){

  return new Promise(function(resolve, reject){
    pPromise.getProbe(urls)
            .then (function (pArr){
              return pArr;

            }).then( function (pArr){
//              pPromise.searchProbeMac("12:34:56:78:90:12")

                let from = new Date(Date.UTC(2018,9,14,8,35));
                let to = new Date(Date.UTC(2018,9,14,8,39));

                pPromise.searchProbeDuration(from, to)
                      .then( function(mpArr){
                      console.log("-----------");
                        console.log(pArr);
                        console.log("-----------");

                        console.log(mpArr);
                        return mpArr;
               }).then(function (mpArr){
                 console.log( getMaxRssiData(mpArr) );
                 resolve();
               });
             }).catch(function (err){
                 console.log(err);
                 reject(err);
             });
  });
}

prbLoop();
