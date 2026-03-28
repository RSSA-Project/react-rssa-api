import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useFetchParticipant } from '../useFetchParticipant';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const mockGet = vi.fn();
vi.mock('../StudyContext', () => ({
	useStudy: () => ({
		studyApi: {
			get: mockGet,
		},
	}),
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useFetchParticipant', () => {
	it('fetches participant successfully', async () => {
		const mockData = { id: 'p1', study_id: 's1' };
		mockGet.mockResolvedValueOnce(mockData);

		const { result } = renderHook(() => useFetchParticipant(), { wrapper });

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data).toEqual(mockData);
		expect(mockGet).toHaveBeenCalledWith('participants/me');
	});
});
