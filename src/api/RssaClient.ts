export interface RssaClientInterface {
	setJwt(token: string | null): void;
	getJwt(): string | null;

	get<T>(path: string): Promise<T>;
	post<TBody, TResponse>(path: string, data: TBody): Promise<TResponse>;
	patch<TBody, TResponse>(path: string, data: TBody): Promise<TResponse>;
}

class RssaClient implements RssaClientInterface {
	private apiUrlBase: string;
	private apiKeyId: string;
	private apiKeySecret: string;
	private studyId: string;
	private jwt: string | null = null;

	constructor(apiUrlBase: string, apiKeyId: string, apiKeySecret: string, studyId: string) {
		this.apiUrlBase = apiUrlBase;
		this.apiKeyId = apiKeyId;
		this.apiKeySecret = apiKeySecret;
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

	private async getHeaders(): Promise<Record<string, string>> {
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
			'X-Api-Key-Id': this.apiKeyId,
			'X-Api-Key-Secret': this.apiKeySecret,
		};

		if (this.jwt) {
			headers['Authorization'] = `Bearer ${this.jwt}`;
		}
		return headers;
	}

	/**
	 * Handles API response errors by reading the body, throwing a structured error,
	 * and preventing stream consumption of the main response body if possible.
	 * @param response The fetch Response object.
	 * @param url The request URL for logging.
	 */
	private async handleError(response: Response, url: string): Promise<void> {
		const errorStatus = response.status;
		let errorBody: any = null;

		try {
			errorBody = await response.clone().json();
		} catch (e) {
			errorBody = await response
				.clone()
				.text()
				.catch(() => 'No response body');
		}

		const error = new Error(`Request failed: ${errorStatus} ${response.statusText}`);
		(error as any).status = errorStatus;
		(error as any).body = errorBody;

		console.error(`API Error on ${url} (${errorStatus}):`, errorBody);
		throw error;
	}

	/**
	 * Executes the fetch request and handles success/error parsing.
	 * @param url The full request URL.
	 * @param options Fetch options (method, headers, body).
	 */
	private async executeRequest<T>(url: string, options: RequestInit): Promise<T> {
		const response = await fetch(url, options);

		if (!response.ok) {
			await this.handleError(response, url);
			throw new Error('Request failed unexpectedly.');
		}

		if (response.status === 204) {
			return null as T;
		}

		return await response.json();
	}

	public async get<T>(path: string): Promise<T> {
		const url = `${this.apiUrlBase}${path}`;
		const headers = await this.getHeaders();
		return await this.executeRequest<T>(url, { method: 'GET', headers });
	}

	public async post<TBody, TResponse>(path: string, data: TBody): Promise<TResponse> {
		const url = `${this.apiUrlBase}${path}`;
		const headers = await this.getHeaders();
		return await this.executeRequest<TResponse>(url, {
			method: 'POST',
			headers,
			body: JSON.stringify(data),
		});
	}

	public async patch<TBody, TResponse>(path: string, data: TBody): Promise<TResponse> {
		const url = `${this.apiUrlBase}${path}`;
		const headers = await this.getHeaders();
		return await this.executeRequest<TResponse>(url, {
			method: 'PATCH',
			headers,
			body: JSON.stringify(data),
		});
	}
}

export default RssaClient;
