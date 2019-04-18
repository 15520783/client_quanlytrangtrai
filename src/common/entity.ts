class pig {
	id:string;
	pig_code:string;
	house_id:string;
	round_id:string;
	breed_id:string;
	gender:number;
	father_id:string;
	mother_id:string;
	birthday:any;
	born_weight:number;
	born_status:number;
	origin_id:string;
	origin_father:string;
	origin_mother:string;
	origin_weight:number;
	receive_weight:number;
	health_point:number;
	foot:number;
	function_udder:number;
	total_udder:number;
	gential:number;
	description:string;
	fcr:number;
	adg:number;
	bf:number;
	filet:number;
	long_back:number;
	long_body:number;
	index:number;
	parities:number;
	images:string;
	health_status:number;
	breeding_type:number;
	breed_status:number;
	pregnancy_status:number;
	overview_status:number;
	point_review:number;
	status:number;
	price_code:number;
}

class group {
	id:string = '';
	group_code:string = '';
	parent_id:string;
	round_id:string;
	father_id:string;
	mother_id:string;
	avg_birthday:any;
	quantity:number;
	heal_status:string;
	overview_status:string;
	origin_sum_weight:number;
	origin_avg_weight:number;
	status:string;
	mark:string;
	health_status:string;
	description:string;
}


class farm {
    id: string;
    name:string;
    type_id: number;
    address: string;
    area: number;
    total_pig: number;
    founding: any;
    manager: string;
	description: string;
	
	constructor(){
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

class section {
	id:string;
	type_id:string;
	department_id:string;
	name:string;
	description:string;
	manager:string;
	founding:any;
}

class house {
	id:string='';
	section_id:string;
	type_id:string;
	house_code:string;
	name:string;
	description:string;
	position:string;
	manager:string;
	founding:any;

	constructor(){
		this.id ='';
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

class employee {
	id:string;
	regency_id:string;
	farm_id:string;
	name:string;
	gender:number;
	birthday:any ;
	address:string;
	level:string;
	email:string;
	cmnd:string;
	date_join:any;
	date_off:any;
	images:string;
	status:string;

	constructor(){
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


export {farm}
export {section}
export {house}
export {pig}
export {group}
export {employee}