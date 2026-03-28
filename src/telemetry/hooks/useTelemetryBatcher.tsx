import { useCallback, useEffect, useRef } from 'react';
import { RssaClientInterface } from '../../api';

export interface TelemetryEvent {
	event_type: string;
	item_id?: string | null;
	event_data: Record<string, any>;
	client_timestamp: string;
}

interface UseTelemetryBatcherProps {
	apiClient: RssaClientInterface;
	flushIntervalMs?: number; // Default: 10 seconds
	maxBatchSize?: number; // Default: 50 events
}

export function useTelemetryBatcher({
	apiClient,
	flushIntervalMs = 10000,
	maxBatchSize = 50,
}: UseTelemetryBatcherProps) {
	const queueRef = useRef<TelemetryEvent[]>([]);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const flush = useCallback(
		(isUnmounting = false) => {
			if (queueRef.current.length === 0 || !apiClient.getJwt()) {
				if (isUnmounting) queueRef.current = [];
				return;
			}
			const payload = { events: queueRef.current };
			queueRef.current = [];

			apiClient
				.post(`participants/telemetry`, payload, { keepalive: isUnmounting })
				.catch((err) => console.error('Telemtry flush failed:', err));
		},
		[apiClient]
	);

	const trackEvent = useCallback(
		(eventType: string, eventData: Record<string, any> = {}, itemId?: string) => {
			const newEvent: TelemetryEvent = {
				event_type: eventType,
				item_id: itemId || null,
				event_data: eventData,
				client_timestamp: new Date().toISOString(),
			};

			queueRef.current.push(newEvent);
			if (queueRef.current.length >= maxBatchSize) {
				flush();
			}
		},
		[flush, maxBatchSize]
	);

	useEffect(() => {
		timerRef.current = setInterval(() => flush(), flushIntervalMs);
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [flush, flushIntervalMs]);

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.visibilityState === 'hidden') flush(true);
		};

		window.addEventListener('visibilitychange', handleVisibilityChange);
		return () => {
			window.removeEventListener('visibilitychange', handleVisibilityChange);
			flush(true);
		};
	}, [flush]);

	return { trackEvent, flush };
}
