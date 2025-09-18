import React, { ReactNode, useContext, useEffect, useMemo } from 'react';
import { RssaClient } from '../api';
import { useParticipant } from '../auth';

interface StudyContextType {
	studyApi: RssaClient;
}

interface StudyProviderProps {
	config: {
		apiUrlBase: string;
		apiKeyId: string;
		apiKeySecret: string;
		studyId: string;
	};
	children: ReactNode;
}

const StudyContext = React.createContext<StudyContextType | undefined>(undefined);

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

export const useStudy = () => {
	const context = useContext(StudyContext);
	if (!context) {
		throw new Error('useStudy must be used within a StudyProvider');
	}
	return context;
};
