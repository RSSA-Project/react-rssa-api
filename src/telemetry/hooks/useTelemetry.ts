import { useContext } from 'react';
import { TelemetryContext, TelemetryContextType } from '../providers/internals/TelemetryContextInternals';

export const useTelemetry = (): TelemetryContextType => {
	const context = useContext(TelemetryContext);

	if (!context) {
		throw new Error(
			'useTelemetry must be used within a TelemetryProvider. ' +
				'Ensure the participant has consented before rendering this component.'
		);
	}

	return context;
};
