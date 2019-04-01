class pig {
	id:String;
	pig_code:String;
	house_id:String;
	round_id:String;
	breed_id:String;
	gender:number;
	birthday:Date;
	born_weight:number;
	born_status:number;
	origin_id:String;
	origin_father:String;
	origin_mother:String;
	origin_weight:number;
	receive_weight:number;
	health_point:number;
	foot:number;
	function_udder:number;
	total_udder:number;
	gential:number;
	description:String;
	fcr:number;
	adg:number;
	bf:number;
	filet:number;
	long_back:number;
	long_body:number;
	index:number;
	parities:number;
	images:String;
	health_status:number;
	breeding_type:number;
	breed_status:number;
	pregnancy_status:number;
	overview_status:number;
	point_review:number;
	status:number;
	price_code:number;
}


class farm {
    id: String;
    name:String;
    type_id: number;
    address: String;
    area: number;
    total_pig: number;
    founding: Date;
    manager: String;
    description: String;
}

class section {
	id:String;
	type_id:String;
	department_id:String;
	name:String;
	description:String;
	manager:String;
	founding:Date;
}

class house {
	id:String;
	section_id:String;
	type_id:String;
	house_code:String;
	name:String;
	description:String;
	position:String;
	manager:String;
	founding:Date;
}


export {farm}
export {section}
export {house}
export {pig}