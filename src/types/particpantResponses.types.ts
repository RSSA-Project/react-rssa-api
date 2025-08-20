export type FreeFormTextResponse = {
	context_tag: string;
	response: string;
}

export type FreeFormTextResponseRequest = {
	participant_id: string;
	step_id: string;
	responses: FreeFormTextResponse[];
}

export type SurveyItemResponse = {
	construct_id: string;
	item_id: string;
	scale_id: string;
	scale_level_id: string;
}

export type SurveyResponse = {
	participant_id: string;
	step_id: string;
	page_id: string;
	responses: SurveyItemResponse[];
}