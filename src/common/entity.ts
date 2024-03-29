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
export { medicineUnits, foodUnits }
export { medicines }
export { priceCodes }
export { footType }
export { gentialType }
export { issues }
export { markTypes }
export { regencies }
export { mating_status }
export { warehouse_type }
export { round }
export { partners }
export { roles }
export { invoicesPig }
export { invoicesProduct }
export { invoicePigDetail }
export { foodWareHouse }
export { medicineWarehouse }
export { status }
export { breedings }
export { sperms }
export { matingRole }
export { mating, matingDetails }
export { issuesPigs }
export { births }
export { feeds }
export { usedMedicine }
export { customerType, customerGroups, customers }
export { schedule }
export { permission, rolepermission, screen }

class base {
	id: string = '';
	createdAt: any = '';
	updatedAt: any = '';
	delFlag: boolean = false;

	constructor() {}

	setID(id: string) {
		this.id = id;
	}
}

class user extends base {
	username: string = '';
	password: string = '';
	email: string;
	employee: employee = new employee();
	role: roles = new roles();
	activate: number = null;
	language: string = 'vi';
	tokenNotification: string = '';
	lastActivate: any = '';
	login: number;
}

class pig extends base {
	pigCode: string = '';
	farm_id: string = '';
	farm: farm = new farm();
	houseId: string = '';
	house: house = new house();
	round: round = new round();
	roundId: string = '';
	breed: breeds = new breeds();
	breedId: string = '';
	gender: number = null;
	birthday: any = '';
	born_weight: number = 0;
	bornStatus: number = 0;
	originId: string = '';
	originFather: string = '';
	originMother: string = '';
	originFatherId: string = '';
	originMotherId: string = '';
	originWeight: number = 0;
	receiveWeight: number = 0;
	healthPoint: number = null;
	footTypeId: string = '';
	foot: footType = new foodType();
	functionUdder: number = 0;
	totalUdder: number = 0;
	gentialTypeId: string = '';
	gential: gentialType = new gentialType();
	description: string = '';
	fcr: number = 0;
	adg: number = 0;
	bf: number = 0;
	filet: number = 0;
	longBack: number = 0;
	longBody: number = 0;
	index: number = 0;
	parities: number = 0;
	images: string = '';
	healthStatus: healthStatus = new healthStatus();
	healthStatusId: number = 0;
	breedingType: string = '0';
	breedStatus: string = '0';
	pregnancyStatus: pregnancyStatus = new pregnancyStatus();
	pregnancyStatusId: string = '0';
	point_review: string = '0';
	status = new status();
	statusId: string = '0';
	priceCodeId: string = '0';
	priceCode: priceCodes = new priceCodes();
	overviewStatus: string = '0';
	birthId: string = '';
	pigType: string = '';
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
	farmId: string = '';
	farm: farm = new farm();
	typeId: string = '';
	name: string = '';
	description: string = '';
	manager: string = '';
	founding: any = '';
}

class house extends base {
	section: section = new section();
	houseCode: string = '';
	name: string = '';
	description: string = '';
	position: string = '';
	founding: any = '';
	status: string = '';
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
	// farm_id: string = '';
	type: warehouse_type = new warehouse_type();
	// groupId: string = '';
	// unitId: string = '';
	// unitType: string = '';
	name: string = '';
	description: string = '';
	manager: employee = new employee();
}




class pregnancyStatus extends base {
	name: string = '';
	description: string = '';
}

class breeds extends base {
	name: string = '';
	lineCode: string = '';
	symbol: string = '';
	code: string = '0';
	level: string = '';
	line: string = '0';
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
	typeId:string = '';
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

class foodUnits extends base {
	name: string = '';
	quantity: number = null;
	description: string = '';
	baseUnit: string = '';

	constructor() {
		super();
	}
}

class medicines extends base {
	medicineCode: string = '';
	typeId:string = '';
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

// class permissions extends base {
// 	name: string;
// 	group_id: string;
// 	show: string;
// 	object_type: string;
// 	description: string;
// 	code: string;
// 	order: string;
// 	constructor() {
// 		super();
// 	}
// }

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
	constructor() {
		super();
	}
}



class roles extends base {
	name: string = '';
	code: string = '';
	description: string = '';
}

class status extends base {
	name: string = '';
	description: string = '';
	code: string = '0';
	previousStatus: string = '0';
}

class partners extends base {
	code: string = '';
	name: string = '';
	manager: string = '';
	address: string = '';
	phone: string = '';
	agencyName: string = '';
	agencyAddress: string = '';
	agencyPhone: string = '';
	distributionName: string = '';
	distributionAddress: string = '';
	distributionPhone: string = '';
	description: string = '';
}

class customerType extends base {
	name: string = '';
	description: string = '';
}

class customerGroups extends base {
	name: string = '';
	description: string = '';
}

class customers extends base {
	type: customerType = new customerType();
	typeId:string = '';
	group: customerGroups = new customerGroups();
	groupId:string = '';
	// farmId: string = ''; // bỏ
	name: string = '';
	phone: string = '';
	email: string = '';
	address: string = '';
	companyAddress: string = '';
	fax: string = '';
	bank: string = '';
	description: string = '';
}

class invoicesPig extends base {
	invoiceNo: string = '';
	invoiceType: string = '';
	sourceId: string = '';
	sourceManager: string = '';
	sourceManagerName: string = '';
	sourceAddress: string = '';
	destinationId: string = '';
	destinationManager: string = '';
	destinationManagerName: string = '';
	destinationAddress: string = '';
	vehicleNumber: string = '';
	quantity: number = 0;
	unitPrice: string = '0';
	totalWeight: number = 0;
	totalPrice: number = 0;
	importDate: any = '';
	exportDate: any = '';
	status: string = '';
	description: string = '';
	employee: employee = new employee();
}

class invoicesProduct extends base {
	invoiceNo: string = '';
	invoiceType: string = '';
	source = new partners();
	sourceId: string = '';
	sourceManagerName: string = '';
	destination = new farm();
	destinationId: string = '';
	destinationManager: string = '';
	destinationManagerName: string = '';
	price: number = 0;
	importDate: any = '';
	description: string = '';
	employee: employee = new employee();
	status: string = '';

	constructor() {
		super();
	}
}

class invoicePigDetail extends base {
	invoice: invoicesPig = new invoicesPig();
	objectType: string = '1';
	objectId: string = '';
}

class foodWareHouse extends base {
	warehouse = new warehouse();
	warehouse_id: string = '';
	food = new foods();
	food_id: string = '';
	invoice = new invoicesProduct();
	parentId: string = '';
	unit = new foodUnits();
	unit_id: string = '';
	quantity: string = '0';
	total: string = '0';
	used: string = '0';
	remain: string = '0';
	manufacturer: string = '';
	mfgDate: any = '';
	expiryDate: any = '';
	images: string = '';
	unitPrice:string = '0';
	totalPrice:string = '0';
}

class medicineWarehouse extends base {
	warehouse = new warehouse();
	warehouse_id: string = '';
	medicine = new medicines();
	medicine_id: string = '';
	invoice = new invoicesProduct();
	parentId: string = '';
	importDate: any = '';
	unit = new medicineUnits();
	unit_id: string = '';
	quantity: string = '0';
	total: string = '0';
	used: string = '0';
	remain: string = '0';
	manufacturer: string = '';
	mfgDate: any = '';
	expiryDate: any = '';
	typeUse: string = '';
	unitPrice:string = '0';
	totalPrice:string = '0';
}

class breedings extends base {
	pig = new pig();
	date: any = '';
	logId: string = '';	/** TODO: có thể là không dùng do có thuộc tính createdAt */
	typeId: string = '';
	description: string = '';
	breedingCount: number = 0;
	breedingNext: any = '';
	matingEstimate: any = '';
	matingReal: any = '';
}

class sperms extends base {
	pig = new pig();
	spermCount: number = null;
	date: any = '';
	volume: number = 0;
	doses: number = 0;
	used: number = 0;
	activity: number = 0;
	c: number = 0;
	lifeAvg: number = 0;
	dieAvg: number = 0;
	faddiness: number = 0;
	status: string = '';
}

class matingRole extends base {
	fatherId:string = '';
	motherId:string = '';
	childId:string = '';
	father: breeds = new breeds();
	mother: breeds = new breeds();
	child: breeds = new breeds();
	birthStatusEstimate: string = '';
	description: string = '';
}

class mating extends base {
	mother = new pig();
	motherId: string = '';
	// father = new pig();
	fatherId: string = '';
	child: pig = null;
	childId: string = '';
	date: any = '';
	birthEstimate: any = '';
	status: string = '';
	employeeId: string = '';
	type: string = '';
	typeId: number = 0;
}

class matingDetails extends base {
	mating = new mating();
	sperm = new sperms();
	date: any = '';
	insemination: string = '';
}

class issuesPigs extends base {
	date: any = '';
	pig: pig = new pig();
	pigId: string = '';
	issue: issues = new issues();
	employee: employee = new employee();
	description: string = ''
	images: string = '';
	status: string = '';
}

class usedMedicine extends base {
	forPigId: pig = new pig();
	diseases: diseases = new diseases();
	medicine: medicines;
	medicineWarehouse: medicineWarehouse;
	unit: number = null;
	quantity: number = null;
	date: any = '';
	employee: employee = new employee();
	description: string = '';
}

class births extends base {
	mating: mating = new mating();
	date: any = '';
	// logId: string = '';  // bỏ
	parities: number = 0;
	borning: number = 0;
	fetalWeight: number = 0;
	selected: number = 0;
	dieBeforeBorning: number = 0;
	dieBorning: number = 0;
	dieBlack: number = 0;
	defect: number = 0;
	smallRemove: number = 0;
	// remain: number = 0; // bỏ
}

class feeds extends base {
	pig: pig = new pig();
	foodWarehouse: foodWareHouse = new foodWareHouse();
	unit: number = null;
	quantity: number = null;
	date: any = '';
	employee: employee = new employee();
	description: string = '';
}

class InputObject {
	name: string;
	type: "input-text" | "input-select" | "input-date" | "input-select-target";
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

class schedule extends base {
	name: string = '';
	employee: employee = new employee();
	date: any = '';
	status: string = '';
	farmId: string = '';
	constructor() {
		super();
	}
}

class permission extends base {
	name: string = '';
	code: string = '';
	screen: screen = new screen();
	description: string = '';
}

class rolepermission extends base {
	role: roles = new roles();
	permission: permission = new permission();
}

class screen extends base {
	codeName: string = '';
	name: string = '';
}


class settingConfig {
	serverApi: string = '';
	defaultTimeout: number = null;
	syncDelayDuration: number = null;
}

class ObjectScanner {
	id: string = '';
	typeObject: string = '';
}

class ObjDataNotification {
	notification: {
		title: string,
		body: string,
		sound: 'default',
		icon: "fcm_push_icon"
	};
	data: any;
	registration_ids: Array<string> = [];
	priority: "high";
	restricted_package_name: 'io.ionic.quanlitrangtrai'

	constructor() { }
}

export { ObjDataNotification }
export { ObjectScanner }
export { InputObject }
export { settingConfig }