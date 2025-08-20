import { OrderedComponent } from "../base-types";

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
	study_id: string;
	step_id: string;
	name: string;
	description: string;
	title?: string;
	page_type?: string;
	instructions?: string;
	date_created: string;
}