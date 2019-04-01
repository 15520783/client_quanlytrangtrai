class pig {
	id:String;
	pig_code:String;
	house_id:String;
	round_id:String;
	breed_id:String;
	gender:Number;
	birthday:Date;
	born_weight:Number;
	born_status:Number;
	origin_id:String;
	origin_father:String;
	origin_mother:String;
	origin_weight:Number;
	receive_weight:Number;
	health_point:Number;
	foot:Number;
	function_udder:Number;
	total_udder:Number;
	gential:Number;
	description:String;
	fcr:Number;
	adg:Number;
	bf:Number;
	filet:Number;
	long_back:Number;
	long_body:Number;
	index:Number;
	parities:Number;
	images:String;
	health_status:Number;
	breeding_type:Number;
	breed_status:Number;
	pregnancy_status:Number;
	overview_status:Number;
	point_review:Number;
	status:Number;
	price_code:Number;
}


class farm {
    id: String;
    name:String;
    type_id: Number;
    address: String;
    area: Number;
    total_pig: Number;
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