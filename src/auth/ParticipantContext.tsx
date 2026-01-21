import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface ParticipantContextType {
	jwt: string | null;
	setJwt: (jwt: string | null) => void;
}

const ParticipantContext = createContext<ParticipantContextType | undefined>(undefined);

export const ParticipantProvider = ({
	children,
	storageKeyPrefix = '',
}: {
	children: ReactNode;
	storageKeyPrefix?: string;
}) => {
	const storageKey = `${storageKeyPrefix}_participant_jwt`;
	const [jwt, setJwt] = useState<string | null>(() => {
		return localStorage.getItem(storageKey);
	});

	useEffect(() => {
		if (jwt) {
			localStorage.setItem(storageKey, jwt);
		} else {
			localStorage.removeItem(storageKey);
		}
	}, [jwt, storageKey]);

	const value = { jwt, setJwt };

	return <ParticipantContext.Provider value={value}>{children}</ParticipantContext.Provider>;
};

export const useParticipant = () => {
	const context = useContext(ParticipantContext);
	if (context === undefined) {
		throw new Error('useParticipant must be used within a ParticipantProvider');
	}
	return context;
};
