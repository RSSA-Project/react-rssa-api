export type NewParticipant = {
	study_id: string;
	participant_type: string;
	external_id: string;
	current_step: string;
	current_page: string | null;
};

export type Participant = {
	id: string;
	study_id: string;
	participant_type: string;
	external_id: string;
	condition_id: string;
	current_step: string;
	current_page: string | null;
	date_created: string;
};

import { StudyCondition } from '../rssa-types/studyComponents.types';

export interface StudyParticipantReadWithCondition {
	id: string;
	study_id: string;
	study_condition_id: string;
	study_condition: StudyCondition;
	current_step_id: string;
}
