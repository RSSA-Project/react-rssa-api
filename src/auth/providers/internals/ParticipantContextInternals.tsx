import { createContext } from 'react';

export interface ParticipantContextType {
	jwt: string | null;
	setJwt: (jwt: string | null) => void;
}

export const ParticipantContext = createContext<ParticipantContextType | undefined>(undefined);
