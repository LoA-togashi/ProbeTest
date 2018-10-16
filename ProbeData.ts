export class ProbeData{

	nodeId: number;
	mac: string;
	timestamp: Date;
	rssi; number;

	constructor( nid:number, m:string, tst:string, rs:number ){
		this.nodeId = nid;
		this.mac = m;
		this.timestamp = new Date( tst )
		this.rssi = rs;
	}

	sqlDateTojsDate(sdate:string){
		return sdate;
//		return sdate.replace(' ','Z');
	}
}
