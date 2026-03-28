import { useQuery } from '@tanstack/react-query';
import { RETRY_DELAYS_MS } from '../../constants';
import { useStudy } from './useStudy';
import { StudyConfig } from '../../types/configs/studyConfig.types';

export const useStudyConfig = (studyId: string) => {
	const { studyApi } = useStudy();

	return useQuery<StudyConfig>({
		queryKey: ['studyConfig', studyId],
		queryFn: () => studyApi.get<StudyConfig>(`studies/${studyId}/config`),
		enabled: !!studyId,
		retry: RETRY_DELAYS_MS.length,
		retryDelay: (attemptIndex) => RETRY_DELAYS_MS[attemptIndex] || 5000,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		gcTime: 1000 * 60 * 60 * 24, // 24 hours
	});
};
