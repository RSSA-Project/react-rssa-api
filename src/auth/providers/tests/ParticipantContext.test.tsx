import { render, screen, act, renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ParticipantProvider, useParticipant } from '../../index';
import React from 'react';

// Wrapper for testing hook
const wrapper = ({ children }: { children: React.ReactNode }) => <ParticipantProvider>{children}</ParticipantProvider>;

describe('ParticipantContext', () => {
	it('provides default values (null jwt)', () => {
		const { result } = renderHook(() => useParticipant(), { wrapper });
		expect(result.current.jwt).toBeNull();
	});

	it('updates jwt', () => {
		const { result } = renderHook(() => useParticipant(), { wrapper });

		act(() => {
			result.current.setJwt('new-token');
		});

		expect(result.current.jwt).toBe('new-token');
	});

	it('renders children', () => {
		render(
			<ParticipantProvider>
				<div data-testid="child">Child</div>
			</ParticipantProvider>
		);
		expect(screen.getByTestId('child')).toBeInTheDocument();
	});
});
