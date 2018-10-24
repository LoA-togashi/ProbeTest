import {ProbeData} from './ProbeData';
import {XMLHttpRequest} from 'xmlhttprequest';
import * as fs from 'fs';
import * as crypto from 'crypto';
import {MongoClient} from 'mongodb';

export class ProbePromise{

  constructor(){
  }

  createProbeArray( lines:string[] ){
    /*if(lines.length > 0){
      for(let line of lines){
        let elems = line.split(',');
      
        let time = elems[0];
        let mac = this.hash.update(elems[1]);
        let rssi = Number(elems[2]);
        let id = 0;

        let data = new ProbeData(id, mac, time, rssi);
      }
    }*/
  }

  storeProbeData( data:ProbeData[] ){
  }

  getProbeHtml(url : string):Promise<XMLHttpRequest.responseText>{
    return new Promise( function(resolve,reject) {

      console.log("url : " + url);
      //ここでhttprequest->resolve->thenの処理をするとコールバックが受けられる
      let xhr = new XMLHttpRequest();
  
      xhr.onload = function(){

        //console.log("onload");  
        if( xhr.status == 200 ){
          console.log("200 : "  + url);
          resolve(xhr.responseText);
        }else{
          console.log(xhr.status + " : " + url);
          reject();
        }
      }

      xhr.open('GET', "http://www.google.co.jp");
      xhr.send();

      xhr.onerror = function( event ){
        console.log(event);
      }


    });
  }

  getProbeFile( fname:string ): Promise<Buffer>{
      
    return new Promise( function(resolve,reject) {

      console.log(fname);
      let data = fs.readFile(fname, function(err,data){

      if(err){
        console.log(err);
        resolve(Buffer.from(""));
      }else{
        resolve(data);
      }
    });

       });
  }

  getProbe( urls:string[]): Promise<ProbeData[]>{
    //passfunctions to Promise
    let getProbeFile = this.getProbeFile;
    let getProbeHtml = this.getProbeHtml;

    return new Promise( function( resolve, reject){

      let ret = [];
      let darr = [];

//      Promise.all( urls.map( getProbeHtml ) )
      Promise.all( urls.map( getProbeFile ) )
             .then( function(results){
                 for(let result of results){
                   let lines = result.toString().split("\n");
                   for(let line of lines){
                     if(line.length > 0){
                     console.log("return : " + line);
                       ret.push(line);
                     }
                     console.log("----------");
                   }
                 }
             }).then( function(){ 
                console.log(ret);
 
                if(ret.length > 0){
                  for(let line of ret){
                    let elems = line.split(',');
      
                    if(elems.length == 3){
                      let time = elems[0];

                      let hash = crypto.createHash('sha512');
                      hash.update(elems[1]);
                      let mac_hash = hash.digest('base64');

                      let rssi = Number(elems[2]);
                      let id = 0;

                      let data = new ProbeData(id, mac_hash, time, rssi);


                      darr.push(data);
                    }

                  }

                }
                return darr;

             }).then( function(darr){
                console.log(darr);

/*              MongoClient.connect("mongodb://localhost:27017/ProbeData", 
                           { useNewUrlParser: true  } )
                         .then(function (client){
                           console.log("connected to server");
                           let db = client.db("ProbeData");
                           db.collection("data1").insertMany(darr);
                           client.close();
                         }).catch(function (err){
                           console.log(err);
                         });
*/

               resolve(darr);
           }).catch( function(err){
              console.log(err);
              reject(err);
           });
     
     });
  }

  dataArrToPrbArr( dataArray:[] ):ProbeData[]{
    let probeData = [];

    for(let data of dataArray){
      let pd = new ProbeData(data["nodeId"], data["mac_hash"], data["timestamp"], data["rssi"]);
      probeData.push(pd);
    }

    return probeData;
  }

  searchProbeMac( mac:string ): Promise<ProbeData[]>{
    let dataArrToPrbArr = this.dataArrToPrbArr;

    return new Promise( function(resolve, reject){
      let hash = crypto.createHash('sha512');
      hash.update(mac);
      let mac_hash = hash.digest('base64');
      let probeData;

      MongoClient.connect("mongodb://localhost:27017/ProbeData", 
                           { useNewUrlParser: true  } )
                 .then( function (client){
                   //console.log("connected to server");
                   let db = client.db("ProbeData");
                     
                   let dataArray = db.collection("data1")
                                     .find({mac_hash: mac_hash})
                                     .toArray();
                   client.close();
                   return dataArray;
                  }).then( function (dataArray){
                    resolve( dataArrToPrbArr(dataArray) );
                  }).catch(function (err){
                    console.log(err);
                    reject(err);
                  });

    });
  }

  searchProbeDuration( from: Date, to: Date):Promise<ProbeData[]>{
    let dataArrToPrbArr = this.dataArrToPrbArr;

    return new Promise( function(resolve, reject){
      MongoClient.connect("mongodb://localhost:27017/ProbeData", 
                           { useNewUrlParser: true  } )
                 .then( function (client){
                   //console.log("connected to server");
                   let db = client.db("ProbeData");
                     
                   let dataArray = db.collection("data1")
                                     .find({ timestamp: {"$gt":from, "$lt": to} })
                                     .toArray();
                   console.log(from.toISOString() + " ; " + to.toISOString());
                   client.close();
                   return dataArray;
                  }).then( function (dataArray){
                    resolve( dataArrToPrbArr(dataArray) );
                  }).catch(function (err){
                    console.log(err);
                    reject(err);
                  });

    });
  }

}
