import { OrderedComponent } from "../base-types";

export type Study = {
	id: string;
	name: string;
	description: string;
	date_created: string;
}

export type StudyCondition = {
	id: string;
	name: string;
	description: string;
	date_created: string;
}

export interface StudyStep extends OrderedComponent {
	study_id: string;
	name: string;
	description: string;
	title?: string;
	instructions?: string;
	pages: Page[];
	step_type?: string;
	date_created: string;
}

export interface Page extends OrderedComponent {
	/**
	 * This behaves like a type and may be used interchangeably with the 
	 * SurveyPage type from surveyComponents.
	 */
	study_id: string;
	step_id: string;

	name: string;
	description: string;

	title?: string;
	instructions?: string;

	page_type?: string;
	date_created: string;
}