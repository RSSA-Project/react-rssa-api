import React, { useEffect, useState, type ReactNode } from 'react';
import { ParticipantContext } from './internals/ParticipantContextInternals';

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
