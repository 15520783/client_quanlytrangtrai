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
export { breeding_type }
export { pregnancy_status }
export { health_status }
export { diseases }
export { farm_type }
export { food_type }
export { food }
export { medicine_type }
export { medicine_units }
export { medicines }
export { price_codes }
export { foot_type }
export { gential_type }
export { issues }
export { mark_types }
export { permissions }
export { regencies }
export { mating_status }
export { warehouse_type }
export { round }


class base {
	id: string = '';
	createdAt: any = '';
	updatedAt: any = '';
	delFlag: boolean = false;
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
	roundId: string = '';
	breedId: string = '';
	gender: number = null;
	birthday: any = '';
	born_weight: number = null;
	bornStatus: number = null;
	originId:string = '';	
	originFather:string = '';
	originMother: string = '';
	originWeight: number = null;
	receiveWeight: number = null;
	healthPoint: number = null;
	footTypeId: number = null;
	functionUdder: number = null;
	totalUdder: number = null;
	gentialTypeId: number = null;
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
	breedingType: number = null;
	breedStatus: number = null;
	pregnancyStatusId: number = null;
	point_review: number = null;
	status: number = null;
	priceCodeId: number = null;
	overviewStatus: number = null;
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
	mark: mark_types = new mark_types();
	healthStatus: health_status = new health_status();
	description: string = '';
}


class farm extends base {
	name: string = '';
	type: farm_type = new farm_type();
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
	type: farm_type = new farm_type();
	groupId:string = '';
	unitId: string = '';
	unitType: string = '';
	name: string = '';
	description: string = '';
	manager: string = '';
}




class pregnancy_status extends base {
	name: string = '';
	description: string = '';
}

class breeds extends base {
	name: string;
	line_code: string;
	symbol: string;
	code: string;
	level: string;
	line: string;
	description: string;
	created_at: any;
	updated_at: any;

	constructor() {
		super();
	}
}

class breeding_type extends base {
	name: string = '';
	description: string = '';
}

class health_status extends base {
	name: string = '';
	description: string ='';
	constructor() {
		super();
	}
}

class diseases extends base {
	name: string;
	description: string;
	agent: string;
	symptom: string;
	diagnose: string;
	treatment: string;
	note: string;
	created_at: any;
	updated_at: any;
	constructor() {
		super();
	}
}

class farm_type extends base {
	name: string = '';
	description: string = '';

	constructor() {
		super();
	}
}

class food_type extends base {
	name: string;
	description: string;
	created_at: any;
	updated_at: any;
	constructor() {
		super();
	}
}

class food extends base {
	food_code: string;
	type_id: string;
	name: string;
	use_for: string;
	guide: string;
	description: string;
	created_at: any;
	updated_at: any;
	constructor() {
		super();
	}
}

class medicine_type extends base {
	name: string;
	description: string;
	created_at: any;
	updated_at: any;
	constructor() {
		super();
	}
}

class medicine_units extends base {
	name: string;
	quantity: string;
	description: string;
	base_unit: string;
	created_at: any;
	updated_at: any;
	constructor() {
		super();
	}
}

class medicines extends base {
	id: string;
	medicine_code: string;
	type_id: string;
	name: string;
	use_for: string;
	guide: string;
	description: string;
	constructor() {
		super();
	}
}

class price_codes extends base {
	id: string;
	name: string;
	description: string;
	created_at: any;
	updated_at: any;
	constructor() {
		super();
	}
}

class foot_type extends base {
	name: string;
	description: string;
	created_at: any;
	updated_at: any;
	constructor() {
		super();
	}
}

class gential_type extends base {

	name: string;
	description: string;

	constructor() {
		super();
	}
}

class issues extends base {
	level: string;
	symptom: string;
	lesions: string;
	description: string;
	constructor() {
		super();
	}
}

class mark_types extends base {
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