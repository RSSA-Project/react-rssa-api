export type ScaleLevel = {
	level: number;
	label: string;
	scale_id: string;
}

export type ConstructItem = {
	id: string;
	construct_id: string;
	text: string;
	order_position: number;
	item_type: string;
}

export type SurveyPage = {
	step_id: string,
	page_id: string,
	order_position: number,
	construct_id: string,
	construct_items: ConstructItem[],
	construct_scale: ScaleLevel[]
}

export type SurveyItemResponse = {
	item_id: string;
	response: string;
}

export type SurveyResponse = {
	participant_id: string;
	page_id: string;
	responses: SurveyItemResponse[];
}

export type SurveyConstruct = {
	construct_id: string;
	construct_items: ConstructItem[];
}