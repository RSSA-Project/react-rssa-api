import { useEffect, useRef } from 'react';
import { RssaClientInterface } from '../../api';

interface UseSessionTrafficProps {
	apiClient: RssaClientInterface;
	sessionData: string | null; // Expected to be a stringified JSON object
	studyId: string;
	heartbeatIntervalMs?: number; // Default: 30 seconds
}

export function useSessionTraffic({
	apiClient,
	sessionData,
	studyId,
	heartbeatIntervalMs = 30000,
}: UseSessionTrafficProps) {
	const hasLoggedEntry = useRef(false);

	useEffect(() => {
		if (!sessionData || hasLoggedEntry.current) return;

		apiClient
			.post('/traffic/arrival', {
				study_id: studyId,
				session_data: sessionData,
				timestamp: new Date().toISOString(),
			})
			.catch((err) => console.error('Traffic arrival logging failed:', err));

		hasLoggedEntry.current = true;

		const heartbeat = setInterval(() => {
			apiClient
				.post('/traffic/heartbeat', {
					study_id: studyId,
					session_data: sessionData,
					timestamp: new Date().toISOString(),
				})
				.catch((err) => console.error('Traffic heartbeat logging failed:', err));
		}, heartbeatIntervalMs);

		return () => clearInterval(heartbeat);
	}, [sessionData, studyId, heartbeatIntervalMs]);
}
