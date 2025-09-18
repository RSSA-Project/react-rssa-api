export interface RssaClientInterface {
	setJwt(token: string | null): void;
	getJwt(): string | null;

	get<T>(path: string): Promise<T>;
	post<TResponse, TBody>(path: string, data: TBody): Promise<TResponse>;
	patch<TBody>(path: string, data: TBody): Promise<void>;
}

class RssaClient implements RssaClientInterface {
	private apiUrlBase: string;
	private apiKey: string;
	private studyId: string;
	private jwt: string | null = null;

	constructor(apiUrlBase: string, apiKey: string, studyId: string) {
		this.apiUrlBase = apiUrlBase;
		this.apiKey = apiKey;
		this.studyId = studyId;
	}

	public setJwt(token: string | null): void {
		this.jwt = token;
	}

	public getJwt(): string | null {
		return this.jwt;
	}

	public getStudyId(): string {
		return this.studyId;
	}

	// private header = {
	// 	'Content-Type': 'application/json',
	// 	'Access-Control-Allow-Origin': '*',
	// 	'Access-Control-Allow-Headers': '*',
	// 	'Access-Control-Allow-Methods': 'OPTIONS,PUT,POST,GET',
	// };

	private async getHeaders(): Promise<Record<string, string>> {
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
			'X-Api-Key': this.apiKey,
		};

		if (this.jwt) {
			headers['Authorization'] = `Bearer ${this.jwt}`;
		}
		return headers;
	}

	public async get<T>(path: string): Promise<T> {
		const url = `${this.apiUrlBase}${path}`;
		const headers = await this.getHeaders();
		const response = await fetch(url, { method: 'GET', headers });

		if (!response.ok) {
			throw new Error(`GET request to ${url} failed with status ${response.status}`);
		}
		return response.json();
	}
	public async post<TResponse, TBody>(path: string, data: TBody): Promise<TResponse> {
		const url = `${this.apiUrlBase}${path}`;
		const headers = await this.getHeaders();
		const response = await fetch(url, {
			method: 'POST',
			headers,
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error(`POST request to ${url} failed with status ${response.status}`);
		}
		return response.json();
	}

	public async patch<TBody>(path: string, data: TBody): Promise<void> {
		const url = `${this.apiUrlBase}${path}`;
		const headers = await this.getHeaders();
		const response = await fetch(url, {
			method: 'PATCH',
			headers,
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error(`PATCH request to ${url} failed with status ${response.status}`);
		}
	}
}

export default RssaClient;
