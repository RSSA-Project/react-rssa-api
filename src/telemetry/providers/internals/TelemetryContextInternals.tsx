import { createContext } from 'react';

export interface TelemetryContextType {
	trackEvent: (eventType: string, eventData?: Record<string, any>, itemId?: string) => void;
	forceFlush: () => void;
}

export const TelemetryContext = createContext<TelemetryContextType | null>(null);
