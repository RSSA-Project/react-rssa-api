import { render, screen, renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StudyProvider, useStudy } from '../../index';
import React from 'react';
import RssaClient from '../../../api/RssaClient';
import { ParticipantProvider } from '../../../auth';

// Wrapper with Auth provider since StudyProvider consumes useParticipant
const wrapper = ({ children }: { children: React.ReactNode }) => (
	<ParticipantProvider>
		<StudyProvider
			config={{
				apiUrlBase: 'http://api.test',
				apiKeyId: 'key',
				apiKeySecret: 'secret',
				studyId: 'study-1',
			}}
		>
			{children}
		</StudyProvider>
	</ParticipantProvider>
);

describe('StudyContext', () => {
	it('provides studyApi instance', () => {
		const { result } = renderHook(() => useStudy(), { wrapper });

		expect(result.current.studyApi).toBeInstanceOf(RssaClient);
		expect(result.current.studyApi.getStudyId()).toBe('study-1');
	});

	it('renders children', () => {
		render(wrapper({ children: <div data-testid="child">Child</div> }));
		expect(screen.getByTestId('child')).toBeInTheDocument();
	});
});
