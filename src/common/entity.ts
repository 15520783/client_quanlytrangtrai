class pig {
	id:string;
	pig_code:string;
	house_id:string;
	round_id:string;
	breed_id:string;
	gender:number;
	birthday:Date;
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


class farm {
    id: string;
    name:string;
    type_id: number;
    address: string;
    area: number;
    total_pig: number;
    founding: Date;
    manager: string;
    description: string;
}

class section {
	id:string;
	type_id:string;
	department_id:string;
	name:string;
	description:string;
	manager:string;
	founding:Date;
}

class house {
	id:string;
	section_id:string;
	type_id:string;
	house_code:string;
	name:string;
	description:string;
	position:string;
	manager:string;
	founding:Date;
}


export {farm}
export {section}
export {house}
export {pig}