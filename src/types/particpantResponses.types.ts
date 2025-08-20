export type FreeFormTextResponse = {
	context_tag: string;
	response: string;
}

export type FreeFormTextResponseRequest = {
	participant_id: string;
	step_id: string;
	responses: FreeFormTextResponse[];
}