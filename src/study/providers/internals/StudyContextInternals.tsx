import React from 'react';
import { RssaClient } from '../../../api';

export interface StudyContextType {
	studyApi: RssaClient;
}

export const StudyContext = React.createContext<StudyContextType | undefined>(undefined);
