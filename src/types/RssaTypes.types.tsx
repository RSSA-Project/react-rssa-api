export type CurrentStep = {
	current_step_id: string;
};

export type ScaleLevel = {
	level: number;
	label: string;
	scale_id: string;
};

export type ConstructItem = {
	id: string;
	construct_id: string;
	text: string;
	order_position: number;
	item_type: string;
};

export type SurveyPage = {
	step_id: string;
	page_id: string;
	title?: string;
	order_position: number;
	construct_id: string;
	construct_items: ConstructItem[];
};

export type SurveyItemResponse = {
	item_id: string;
	response: string;
};

export type SurveyResponse = {
	participant_id: string;
	page_id: string;
	responses: SurveyItemResponse[];
};

export type SurveyConstruct = {
	construct_id: string;
	construct_items: ConstructItem[];
};

export type TextConstruct = {
	id: string;
	items: ConstructItem;
};

export type PageContent = {
	page_id: string;
	constructs: TextConstruct[];
};

export type Demographic = {
	age_range: string;
	gender: string;
	gender_other: string;
	race: string[];
	race_other: string;
	education: string;
	country: string;
	state_region: string;
};

export type Feedback = {
	participant_id: string;
	feedback: string;
	feedback_type: string;
	feedback_category: string;
};

export type TextItemResponse = {
	construct_id: string;
	item_id: string;
	response: string;
};

export type GroupedTextResponse = {
	participant_id: string;
	page_id: string;
	responses: TextItemResponse[];
};

export type MovieRating = {
	item_id: number;
	rating: number;
};

export type PrefVizRequestObject = {
	user_id: string;
	user_condition: string;
	is_baseline: boolean;
	ratings: MovieRating[];
};
