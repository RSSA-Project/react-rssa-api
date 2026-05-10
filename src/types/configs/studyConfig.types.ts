export interface StudyConditionConfig {
	[key: string]: string;
}

export interface StudyStepConfig {
	step_id: string;
	path: string;
	component_type: string;
}

export interface StudyConfig {
	study_id: string;
	steps: StudyStepConfig[];
}
