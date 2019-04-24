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
	created_at: any = '';
	updated_at: any = '';
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
}

class pig extends base {
	pig_code: string = '';
	farm_id: string = '';
	house_id: string = '';
	round_id: string = '';
	breed_id: string = '';
	gender: number = null;
	father_id: string = '';
	mother_id: string = '';
	birthday: any = '';
	born_weight: number = null;
	born_status: number = null;
	// origin_id:string;
	// origin_father:string;
	// origin_mother:string;
	origin_weight: number = null;
	receive_weight: number = null;
	health_point: number = null;
	foot: number = null;
	function_udder: number = null;
	total_udder: number = null;
	gential: number = null;
	description: string = '';
	fcr: number = null;
	adg: number = null;
	bf: number = null;
	filet: number = null;
	long_back: number = null;
	long_body: number = null;
	index: number = null;
	parities: number = null;
	images: string = '';
	health_status: number = null;
	breeding_type: number = null;
	breed_status: number = null;
	pregnancy_status: number = null;
	overview_status: number = null;
	point_review: number = null;
	status: number = null;
	price_code: number = null;
}

class group extends base {
	farm_id: string = '';
	house_id: string = '';
	group_code: string = '';
	parent_id: string = '';
	round_id: string = '';
	father_id: string = '';
	mother_id: string = '';
	avg_birthday: any = '';
	quantity: number = null;
	heal_status: string = '';
	overview_status: string = '';
	origin_sum_weight: number = null;
	origin_avg_weight: number = null;
	status: string = '';
	mark: string = '';
	health_status: string = '';
	description: string = '';
}


class farm extends base {
	name: string = '';
	type_id: number = null;
	address: string = '';
	area: number = null;
	total_pig: number = null;
	founding: any = '';
	manager: string = '';
	description: string = '';
}

class section extends base {
	farm_id: string;
	type_id: string;
	name: string;
	description: string;
	manager: string;
	founding: any;
}

class house extends base {
	farm_id: string = '';
	section_id: string = '';
	type_id: string = '';
	house_code: string = '';
	name: string = '';
	description: string = '';
	position: string = '';
	manager: string = '';
	founding: any = '';
}

class employee extends base {
	regency_id: string = '';
	farm_id: string = '';
	name: string = '';
	gender: number = null;
	birthday: any = '';
	address: string = '';
	level: string = '';
	email: string = '';
	cmnd: string = '';
	date_join: any = '';
	date_off: any = '';
	images: string = '';
	status: string = '';

}

class warehouse extends base {
	farm_id: string = '';
	type_id: string= '';
	unit_id: string= '';
	unit_type: string= '';
	name: string= '';
	description: string= '';
	manager: string= '';
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