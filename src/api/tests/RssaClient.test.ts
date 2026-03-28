import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import RssaClient from '../RssaClient';

describe('RssaClient', () => {
	let client: RssaClient;
	const apiUrl = 'http://api.example.com/';
	const apiKeyId = 'test-id';
	const apiKeySecret = 'test-secret';
	const studyId = 'test-study';

	beforeEach(() => {
		client = new RssaClient(apiUrl, apiKeyId, apiKeySecret, studyId);
		vi.resetAllMocks();
	});

	// Mock fetch globally
	const fetchMock = vi.fn();
	global.fetch = fetchMock;

	it('instantiates correctly', () => {
		expect(client.getStudyId()).toBe(studyId);
		expect(client.getJwt()).toBeNull();
	});

	it('sets and gets JWT', () => {
		client.setJwt('sometoken');
		expect(client.getJwt()).toBe('sometoken');
	});

	it('constructs correct headers without JWT', async () => {
		fetchMock.mockResolvedValueOnce({
			ok: true,
			status: 200,
			json: async () => ({}),
		});

		await client.get('some/path');

		expect(fetchMock).toHaveBeenCalledWith(
			'http://api.example.com/some/path',
			expect.objectContaining({
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-Api-Key-Id': apiKeyId,
					'X-Api-Key-Secret': apiKeySecret,
				},
			})
		);
	});

	it('constructs correct headers WITH JWT', async () => {
		client.setJwt('abcdef');
		fetchMock.mockResolvedValueOnce({
			ok: true,
			status: 200,
			json: async () => ({}),
		});

		await client.get('some/path');

		expect(fetchMock).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({
				headers: expect.objectContaining({
					Authorization: 'Bearer abcdef',
				}),
			})
		);
	});

	it('handles POST requests with body', async () => {
		const body = { foo: 'bar' };
		fetchMock.mockResolvedValueOnce({
			ok: true,
			status: 201,
			json: async () => ({ result: 'created' }),
		});

		const result = await client.post('create', body);

		expect(fetchMock).toHaveBeenCalledWith(
			'http://api.example.com/create',
			expect.objectContaining({
				method: 'POST',
				body: JSON.stringify(body),
			})
		);
		expect(result).toEqual({ result: 'created' });
	});

	it('handles non-200 / valid errors', async () => {
		fetchMock.mockResolvedValueOnce({
			ok: false,
			status: 400,
			statusText: 'Bad Request',
			clone: () =>
				({
					json: async () => ({ error: 'Invalid input' }),
				}) as any,
		});

		await expect(client.get('fail')).rejects.toThrow('Request failed: 400 Bad Request');
	});
});
