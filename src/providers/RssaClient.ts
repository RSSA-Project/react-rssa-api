export interface RssaClientInterface {
	setParticipantId(participantId: string):void;
	getParticipantId(): string | null;
	get<T>(path: string): Promise<T>;
	post<T1, T2>(path: string, data: T1): Promise<T2>;
	put<T>(path: string, data: T): void;
}

class RssaClient implements RssaClientInterface {
	private api_url_base: string;
	private study_id: string;
	private participant_id: string | null = null;

	constructor(api_url_base: string, study_id: string) {
		this.api_url_base = api_url_base;
		this.study_id = study_id;
	}

	private header = {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': '*',
		'Access-Control-Allow-Methods': 'OPTIONS,PUT,POST,GET'
	};

	/**
	 * Sets the participant ID for the client.
	 * @param participant_id - The ID of the participant.
	 */
	setParticipantId(participant_id: string): void {
		this.participant_id = participant_id;
	}

	/**
	 * Gets the current participant ID.
	 * @returns The participant ID or null if not set.
	 */
	getParticipantId(): string | null {
		return this.participant_id;
	}

	async get<T>(path: string): Promise<T> {
		const url = `${this.api_url_base}${path}`;
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				...this.header,
				'X-Study-Id': `${this.study_id}`,
				'X-Participant-Id': this.participant_id ? `${this.participant_id}` : ''
			}
		});
		if (!response.ok) {
			throw new Error(`Failed to fetch data from ${url}`);
		}
		return response.json();
	}

	async post<T1, T2>(path: string, data: T1): Promise<T2> {
		const url = `${this.api_url_base}${path}`;
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				...this.header,
				'X-Study-Id': `${this.study_id}`,
				'X-Participant-Id': this.participant_id ? `${this.participant_id}` : ''
			},
			body: JSON.stringify(data)
		});
		if (!response.ok) {
			console.log(response);
			throw new Error(`Failed to post data to ${url}`);
		}
		return response.json();
	}

	async put<T>(path: string, data: T): Promise<void> {
		const url = `${this.api_url_base}${path}`;
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				...this.header,
				'X-Study-Id': `${this.study_id}`,
				'X-Participant-Id': this.participant_id ? `${this.participant_id}` : ''
			},
			body: JSON.stringify(data)
		});
		if (!response.ok) {
			throw new Error(`Failed to update data to ${url}`);
		}
	}
}

export default RssaClient;