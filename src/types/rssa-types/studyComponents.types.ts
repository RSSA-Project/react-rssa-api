import { OrderedComponent } from '../base-types';

export interface ElicitationPolicy {
	id: string;
	name: string;
	elicitation_type: 'item_rating' | 'genre_selection' | 'topic_preference';
	min_threshold: number;
	domain: string;
}

export type Study = {
	id: string;
	name: string;
	description: string;
	date_created: string;
};

export type StudyCondition = {
	id: string;
	name: string;
	description: string;
	short_code?: string;
	view_link_key?: string;
	date_created: string;
	active_policy?: ElicitationPolicy | null;
};

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
	 * This may be used interchangeably with the
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
