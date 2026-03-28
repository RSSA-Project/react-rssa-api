import React, { ReactNode } from 'react';
import { RssaClientInterface } from '../../api';
import { useTelemetryBatcher } from '../hooks/useTelemetryBatcher';
import { TelemetryContext } from './internals/TelemetryContextInternals';

interface TelemetryProviderProps {
	children: ReactNode;
	apiClient: RssaClientInterface;
	flushIntervalMs?: number;
}

export const TelemetryProvider: React.FC<TelemetryProviderProps> = ({
	children,
	apiClient,
	flushIntervalMs = 10000,
}) => {
	const { trackEvent, flush } = useTelemetryBatcher({
		apiClient,
		flushIntervalMs,
	});

	return <TelemetryContext.Provider value={{ trackEvent, forceFlush: flush }}>{children}</TelemetryContext.Provider>;
};
