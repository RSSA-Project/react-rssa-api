import { useContext } from 'react';
import { ParticipantContext } from '../providers/internals/ParticipantContextInternals';

export const useParticipant = () => {
	const context = useContext(ParticipantContext);
	if (context === undefined) {
		throw new Error('useParticipant must be used within a ParticipantProvider');
	}
	return context;
};
