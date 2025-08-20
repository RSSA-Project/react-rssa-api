export type ConstructItem = {
	id: string;
	construct_id: string;

	order_position: number;
	text: string;
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

export type ScaleLevel = {
	order_position: number;
	value: number;
	label: string;
	enabled: boolean;
}

export type PageContent = {
	id: string;
	order_position: number;

	items: ConstructItem[];

	name: string;
	desc: string;

	scale_name: string;
	scale_levels: ScaleLevel[];

	enabled: boolean;
}

export type SurveyPage = {
	/**
	 * The recommended type to use for SurveyPage instances which combined the 
	 * the PageContent information, allowing for multiple constructs in a
	 * single survey page. The Page interface from types/studyComponents may
	 * also be used in many cases.
	 */
	id: string;
	study_id: string;
	step_id: string;

	order_position: number;

	name: string;
	title: string | null;
	instructions: string | null;
	description: string | null;
	page_contents: PageContent[];

	enabled: boolean;
	date_created: string;
	last_page: boolean;
}