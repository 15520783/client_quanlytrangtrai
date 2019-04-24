export { base }
export { users }
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


class base {
	id: string;
	created_at: any;
	updated_at: any;

	constructor() {
		this.created_at = '';
		this.updated_at = '';
	}
}

class users extends base {
	username: string;
	password: string;
	email: string;
	employee_id: string;
	activate: number;
	language: string;
	last_active: any;
	login: number;
	constructor() {
		super();
	}
}

class pig extends base {
	pig_code: string;
	farm_id: string;
	house_id: string;
	round_id: string;
	breed_id: string;
	gender: number;
	father_id: string;
	mother_id: string;
	birthday: any;
	born_weight: number;
	born_status: number;
	// origin_id:string;
	// origin_father:string;
	// origin_mother:string;
	origin_weight: number;
	receive_weight: number;
	health_point: number;
	foot: number;
	function_udder: number;
	total_udder: number;
	gential: number;
	description: string;
	fcr: number;
	adg: number;
	bf: number;
	filet: number;
	long_back: number;
	long_body: number;
	index: number;
	parities: number;
	images: string;
	health_status: number;
	breeding_type: number;
	breed_status: number;
	pregnancy_status: number;
	overview_status: number;
	point_review: number;
	status: number;
	price_code: number;

	constructor() {
		super();
		this.id = '';
		this.farm_id = '';
		this.pig_code = '';
		this.house_id = '';
		this.round_id = '';
		this.breed_id = '';
		this.gender = null;
		this.father_id = '';
		this.mother_id = '';
		this.birthday = '';
		this.born_weight = null;
		this.born_status = null;
		// this.origin_id = '';
		// this.origin_father = '';
		// this.origin_mother = '';
		this.origin_weight = null;
		this.receive_weight = null;
		this.health_point = null;
		this.foot = null;
		this.function_udder = null;
		this.total_udder = null;
		this.gential = null;
		this.description = null;
		this.fcr = null;
		this.adg = null;
		this.bf = null;
		this.filet = null;
		this.long_back = null;
		this.long_body = null;
		this.index = null;
		this.parities = null;
		this.images = '';
		this.health_status = null;
		this.breeding_type = null;
		this.breed_status = null;
		this.pregnancy_status = null;
		this.overview_status = null;
		this.point_review = null;
		this.status = null;
		this.price_code = null;
	}
}

class group extends base {
	farm_id:string;
	house_id:string;
	group_code: string;
	parent_id: string;
	round_id: string;
	father_id: string;
	mother_id: string;
	avg_birthday: any;
	quantity: number;
	heal_status: string;
	overview_status: string;
	origin_sum_weight: number;
	origin_avg_weight: number;
	status: string;
	mark: string;
	health_status: string;
	description: string;

	constructor() {
		super();
		this.id = '';
		this.farm_id = '';
		this.house_id = '';
		this.group_code = '';
		this.parent_id = '';
		this.round_id = '';
		this.father_id = '';
		this.mother_id = '';
		this.avg_birthday = '';
		this.quantity = null;
		this.heal_status = '';
		this.overview_status = '';
		this.origin_sum_weight = null;
		this.origin_avg_weight = null;
		this.status = '';
		this.mark = '';
		this.health_status = '';
		this.description = '';
	}
}


class farm extends base {
	name: string;
	type_id: number;
	address: string;
	area: number;
	total_pig: number;
	founding: any;
	manager: string;
	description: string;

	constructor() {
		super();
		this.id = '';
		this.name = '';
		this.type_id = null;
		this.address = '';
		this.area = null;
		this.total_pig = null;
		this.founding = '';
		this.manager = '';
		this.description = '';
	}
}

class section extends base {
	farm_id:string;
	type_id: string;
	name: string;
	description: string;
	manager: string;
	founding: any;
	constructor() {
		super();
	}
}

class house extends base {
	farm_id:string;
	section_id: string;
	type_id: string;
	house_code: string;
	name: string;
	description: string;
	position: string;
	manager: string;
	founding: any;

	constructor() {
		super();
		this.id = '';
		this.farm_id = '';
		this.section_id = '';
		this.type_id = '';
		this.house_code = '';
		this.name = '';
		this.description = '';
		this.position = '';
		this.manager = '';
		this.founding = '';
	}
}

class employee extends base {
	regency_id: string;
	farm_id: string;
	name: string;
	gender: number;
	birthday: any;
	address: string;
	level: string;
	email: string;
	cmnd: string;
	date_join: any;
	date_off: any;
	images: string;
	status: string;

	constructor() {
		super();
		this.id = '';
		this.regency_id = '';
		this.farm_id = '';
		this.name = '';
		this.gender = null;
		this.birthday = '';
		this.address = '';
		this.level = '';
		this.email = '';
		this.cmnd = '';
		this.date_join = '';
		this.date_off = '';
		this.images = '';
		this.status = '';
	}
}

class warehouse extends base {
	farm_id:string;
	type_id: string;
	unit_id: string;
	unit_type: string;
	name: string;
	description: string;
	manager: string;

	constructor() {
		super();
		this.id = '';
		this.farm_id = '';
		this.type_id = '';
		this.unit_id = '';
		this.unit_type = '';
		this.name = '';
		this.description = '';
		this.manager = '';
	}
}




class pregnancy_status extends base {
	name: string;
	description: string;
	created_at: any;
	updated_at: any;
	constructor() {
		super();
	}
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
	name: string;
	description: string;
	constructor() {
		super();
	}
}

class health_status extends base {
	name: string;
	description: string;
	created_at: any;
	updated_at: any;
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
	name: string;
	description: string;
	created_at: any;
	updated_at: any;
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
	name: string;
	description: string;
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
	name: string;
	description: string;
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
	name: string;
	description: string;
	constructor() {
		super();
	}
}

