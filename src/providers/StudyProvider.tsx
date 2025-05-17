import React, { ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Participant, StudyStep } from '../types/RssaTypes.types';
import RssaClient from './RssaClient';


interface StudyContextType {
	studyApi: RssaClient;
	participant: Participant | undefined;
	setParticipant: React.Dispatch<React.SetStateAction<Participant | undefined>>;
	studyStep: StudyStep | undefined;
	setStudyStep: React.Dispatch<React.SetStateAction<StudyStep | undefined>>;
	updateStudyProgress: (step: StudyStep, currentParticipant: Participant, referrer: string) => void;
}

interface StudyProviderProps {
	config: {
		api_url_base: string;
		study_id: string;
	};
	children: ReactNode;
}

const StudyContext = React.createContext<StudyContextType | null>(null);

const StudyProvider: React.FC<StudyProviderProps> = ({
	config,
	children
}) => {

	const { api_url_base, study_id } = config;
	const [studyApi] = useState<RssaClient>(new RssaClient(api_url_base, study_id));
	const [participant, setParticipant] = useState<Participant | undefined>(undefined);
	const [studyStep, setStudyStep] = useState<StudyStep | undefined>(undefined);
	const navigate = useNavigate();

	const updateStudyProgress = useCallback(
		async (step: StudyStep, currentParticipant: Participant, referrer: string) => {
			const updatedParticipant = { ...currentParticipant, current_step: step.id };
			try {
				await studyApi.put('participant/', updatedParticipant);
				localStorage.setItem('participant', JSON.stringify(updatedParticipant));
				localStorage.setItem('studyStep', JSON.stringify(step));
				localStorage.setItem('lastUrl', referrer);
				setParticipant(updatedParticipant);
				setStudyStep(step);
				if (referrer && referrer !== window.location.pathname) {
					navigate(referrer);
				}
			} catch (error) {
				console.error("Error updating participant", error);
				// Handle error appropriately
			}
		},
		[studyApi, navigate, setParticipant, setStudyStep]
	);


	const value = useMemo(
		() => ({
			studyApi,
			participant,
			setParticipant,
			studyStep,
			setStudyStep,
			updateStudyProgress,
		}),
		[studyApi, participant, setParticipant, studyStep, setStudyStep, updateStudyProgress]
	);

	return (
		<StudyContext.Provider value={value}>
			{children}
		</StudyContext.Provider>
	);
}

const useStudy = () => {
	const context = useContext(StudyContext);
	console.log("useStudy", context);
	if (!context) {
		throw new Error('useStudy must be used within a StudyProvider');
	}
	return context;
}

export { StudyProvider, useStudy };
