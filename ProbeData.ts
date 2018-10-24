export class ProbeData{

	nodeId: number;
	mac_hash: string;
	timestamp: Date;
	rssi: number;

	constructor( nid:number, m:string, tst:string, rs:number ){
		this.nodeId = nid;
		this.mac_hash = m;
		this.timestamp = new Date( tst )
		this.rssi = rs;
	}

	sqlDateTojsDate(sdate:string){
		return sdate;
	}
}
