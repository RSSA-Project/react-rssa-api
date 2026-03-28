import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useStudyConfig } from '../useStudyConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Mock useStudy
const mockGet = vi.fn();
vi.mock('../StudyContext', () => ({
	useStudy: () => ({
		studyApi: {
			get: mockGet,
		},
	}),
}));
vi.mock('../../constants', () => ({
	RETRY_DELAYS_MS: [],
}));

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useStudyConfig', () => {
	afterEach(() => {
		queryClient.clear();
		vi.clearAllMocks();
	});

	it('fetches config successfully', async () => {
		const mockData = { study_id: '123', steps: [] };
		mockGet.mockResolvedValueOnce(mockData);

		const { result } = renderHook(() => useStudyConfig('123'), { wrapper });

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data).toEqual(mockData);
		expect(mockGet).toHaveBeenCalledWith('studies/123/config');
	});

	it('handles errors', async () => {
		mockGet.mockRejectedValueOnce(new Error('Failed'));

		const { result } = renderHook(() => useStudyConfig('error-id'), { wrapper });

		await waitFor(() => expect(result.current.status).toBe('error'));
		expect(result.current.error).toBeDefined();
	});
});
