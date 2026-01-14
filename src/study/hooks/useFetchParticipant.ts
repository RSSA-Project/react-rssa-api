import { useQuery } from '@tanstack/react-query';
import { useStudy } from '../StudyContext';
import { StudyParticipantReadWithCondition } from '../../types/rssa-types/particpants.types';

export const useFetchParticipant = () => {
	const { studyApi } = useStudy();

	return useQuery<StudyParticipantReadWithCondition>({
		queryKey: ['participant', 'me'],
		queryFn: async () => await studyApi.get<StudyParticipantReadWithCondition>('participants/me'),
		enabled: !!studyApi,
		staleTime: Infinity,
	});
};
