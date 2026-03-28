import React, { ReactNode, useContext, useEffect, useMemo } from 'react';
import { RssaClient } from '../../api';
import { useParticipant } from '../../auth';
import { StudyContext } from './internals/StudyContextInternals';

interface StudyProviderProps {
	config: {
		apiUrlBase: string;
		apiKeyId: string;
		apiKeySecret: string;
		studyId: string;
	};
	children: ReactNode;
}

export const StudyProvider: React.FC<StudyProviderProps> = ({ config, children }) => {
	const { apiUrlBase, apiKeyId, apiKeySecret, studyId } = config;
	const { jwt } = useParticipant();

	const studyApi = useMemo(
		() => new RssaClient(apiUrlBase, apiKeyId, apiKeySecret, studyId),
		[apiUrlBase, apiKeyId, apiKeySecret, studyId]
	);

	useEffect(() => {
		studyApi.setJwt(jwt);
	}, [jwt, studyApi]);

	const value = useMemo(() => ({ studyApi }), [studyApi]);

	return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
};
