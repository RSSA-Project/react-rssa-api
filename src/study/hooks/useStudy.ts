import { useContext } from 'react';
import { StudyContext } from '../providers/internals/StudyContextInternals';

export const useStudy = () => {
	const context = useContext(StudyContext);
	if (!context) {
		throw new Error('useStudy must be used within a StudyProvider');
	}
	return context;
};
