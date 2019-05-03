export { base }
export { user }
export { farm }
export { section }
export { house }
export { pig }
export { group }
export { employee }
export { warehouse }
export { breeds }
export { breedingType }
export { pregnancyStatus }
export { healthStatus }
export { diseases }
export { farmTypes }
export { foodType }
export { foods }
export { medicineType }
export { medicineUnits }
export { medicines }
export { priceCodes }
export { footType }
export { gentialType }
export { issues }
export { markTypes }
export { permissions }
export { regencies }
export { mating_status }
export { warehouse_type }
export { round }
export {partners}
export {roles}
export {invoicesPig}
export {invoicesProduct}
export {invoicePigDetail}

class base {
	id;
	createdAt: any = '';
	updatedAt: any = '';
	delFlag: boolean = false;

	constructor(){

	}
}

class user extends base {
	username: string = '';
	password: string = '';
	email: string;
	employee_id: string = '';
	activate: number = null;
	language: string = '';
	last_active: any = '';
	login: number;
}

class pig extends base {
	pigCode: string = '';
	farm_id: string = '';
	houseId: string = '';
	roundId: string = '0';
	breedId: string = '';
	gender: number = null;
	birthday: any = '';
	born_weight: number = null;
	bornStatus: number = null;
	originId: string = '';
	originFather: string = '';
	originMother: string = '';
	originWeight: number = null;
	receiveWeight: number = null;
	healthPoint: number = null;
	footTypeId: string = '';
	functionUdder: number = null;
	totalUdder: number = null;
	gentialTypeId: string = '';
	// gentialTypeId: number = null;
	description: string = '';
	fcr: number = null;
	adg: number = null;
	bf: number = null;
	filet: number = null;
	longBack: number = null;
	longBody: number = null;
	index: number = null;
	parities: number = null;
	images: string = '';
	healthStatusId: number = null;
	breedingType: string = '0';
	breedStatus: string = '0';
	pregnancyStatusId: string = '0';
	point_review: string = '0';
	status: string = '0';
	priceCodeId: string = '0';
	overviewStatus: string = '0';

	constructor(){
		super();
	}
}

class group extends base {
	farm_id: string = '';
	house_id: string = '';
	groupCode: string = '';
	parentId: string = '';
	round: round = new round();
	// father_id: string = '';
	// mother_id: string = '';
	avgBirthday: any = '';
	quantity: number = null;
	overviewStatus: string = '';
	originSumWeight: number = null;
	originAvgWeight: number = null;
	status: string = '';
	mark: markTypes = new markTypes();
	healthStatus: healthStatus = new healthStatus();
	description: string = '';
}


class farm extends base {
	name: string = '';
	type: farmTypes = new farmTypes();
	address: string = '';
	area: number = null;
	totalPig: number = null;
	founding: any = '';
	manager: string = '';
	description: string = '';
}

class section extends base {
	farm: farm = new farm();
	typeId: string = '';
	name: string = '';
	description: string = '';
	manager: string = '';
	founding: any = '';
}

class house extends base {
	section: section = new section();
	typeId: string = '';
	houseCode: string = '';
	name: string = '';
	description: string = '';
	position: string = '';
	manager: string = '';
	founding: any = '';
}

class employee extends base {
	regency: regencies = new regencies();
	farm: farm = new farm();
	name: string = '';
	gender: number = null;
	birthday: any = '';
	address: string = '';
	email: string = '';
	cmnd: string = '';
	// level: string = '';
	dateJoin: any = '';
	dateOff: any = '';
	images: string = '';
	status: string = '';
}

class warehouse extends base {
	farm_id: string = '';
	type: warehouse_type = new warehouse_type();
	groupId: string = '';
	unitId: string = '';
	unitType: string = '';
	name: string = '';
	description: string = '';
	manager: string = '';
}




class pregnancyStatus extends base {
	name: string = '';
	description: string = '';
}

class breeds extends base {
	name: string = '';
	lineCode: string = '';
	symbol: string = '';
	code: string = '';
	level: string = '';
	line: string = '';
	description: string = '';

	constructor() {
		super();
	}
}

class breedingType extends base {
	name: string = '';
	description: string = '';
}

class healthStatus extends base {
	name: string = '';
	description: string = '';
	constructor() {
		super();
	}
}

class diseases extends base {
	name: string = '';
	description: string = '';
	agent: string = '';
	symptom: string = '';
	diagnose: string = '';
	treatment: string = '';
	note: string = '';
	images: string = '';
	constructor() {
		super();
	}
}

class farmTypes extends base {
	name: string = '';
	description: string = '';

	constructor() {
		super();
	}
}

class foodType extends base {
	name: string = '';
	description: string = '';
	constructor() {
		super();
	}
}

class foods extends base {
	foodCode: string;
	type: foodType = new foodType();
	name: string = '';
	useFor: string = '';
	guide: string = '';
	description: string = '';
	images: string = '';
	constructor() {
		super();
	}
}

class medicineType extends base {
	name: string = '';
	description: string = '';
	constructor() {
		super();
	}
}

class medicineUnits extends base {
	name: string = '';
	quantity: string = '';
	description: string = '';
	baseUnit: string = '';

	constructor() {
		super();
	}
}

class medicines extends base {
	medicineCode: string = '';
	type: medicineType = new medicineType();
	name: string = '';
	useFor: string = '';
	guide: string = '';
	description: string = '';
	constructor() {
		super();
	}
}

class priceCodes extends base {
	name: string = '';
	description: string = '';

	constructor() {
		super();
	}
}

class footType extends base {
	name: string = '';
	description: string = '';

	constructor() {
		super();
	}
}

class gentialType extends base {

	name: string = '';
	description: string = '';

	constructor() {
		super();
	}
}

class issues extends base {
	level: string = '';
	symptom: string = '';
	lesions: string = '';
	description: string = '';
	constructor() {
		super();
	}
}

class markTypes extends base {
	name: string = '';
	description: string = '';
	constructor() {
		super();
	}
}

class permissions extends base {
	name: string;
	group_id: string;
	show: string;
	object_type: string;
	description: string;
	code: string;
	order: string;
	constructor() {
		super();
	}
}

class regencies extends base {
	name: string = '';
	description: string = '';
	constructor() {
		super();
	}
}

class mating_status extends base {
	name: string;
	description: string;
	constructor() {
		super();
	}
}

class warehouse_type extends base {
	name: string = '';
	description: string = '';
	constructor() {
		super();
	}
}

class round extends base {
	from: any = '';
	to: any = '';
	numberOfPig: number = null;
	birthId: string = '';
}

class roles extends base {
	name:string='';
	code:string='';
	description:string='';
}

class partners extends base {
	code:string = '';
	name:string = '';
	manager:string = '';
	address:string='';
	phone:string = '';
	agencyName:string = '';
	agencyAddress:string = '';
	agencyPhone:string='';
	distributionName:string='';
	distributionAddress:string='';
	distributionPhone:string='';
	description:string='';
}

class invoicesPig extends base {
	invoiceNo:string='';
	invoiceType:number=null;
	sourceId:string='';
	sourceManager:number = null;
	sourceManagerName:string = '';
	sourceAddress:string='';
	destinationId:string='';
	destinationManager:string='';
	destinationManagerName:string='';
	destinationAddress:string='';
	vehicleNumber:string='';
	quantity:number = null;
	unitPrice:string='';
	totalWeight:number=null;
	totalPrice:number=null;
	importDate:any='';
	exportDate:any='';
	description:string='';
}

class invoicesProduct extends base {
	invoiceNo:string='';
	invoiceType:number=null;
	sourceId:string='';
	// sourceManager:string = '';
	sourceManagerName:string = '';
	sourceAddress:string='';
	destinationId:string='';
	destinationManager:string='';
	destinationManagerName:string='';
	// warehouseId:string = '';
	// quantity:number = null;          // !!!!!!!!!!!!!!!
	price:number = 0;
	importDate:any='';
	description:string='';
}

class invoicePigDetail extends base{
	invoice:invoicesPig = new invoicesPig();
	objectType:string = '1';
	objectId:string = '';
}

class InputObject {
	name: string;
	type: "input-text" | "input-select" | "input-date";
	label: string;
	isRequire: boolean = false;
	isNumber: boolean = false;
	isMailFormat: boolean = false;
	isMaxlength: boolean = false;
	maxlength: number;
	value: any;
	message: { isRequire: string, isNumber: string, isMailFormat: string, isMaxlength: string };
	placeholder: string;
	data: any;
}

export { InputObject }