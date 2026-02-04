# RSSA React API (@rssa-project/api)

[![npm version](https://img.shields.io/npm/v/@rssa-project/api.svg)](https://www.npmjs.com/package/@rssa-project/api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
A React library for interacting with the RSSA Platform API. This library provides a typed client, hooks for accessing study configuration, and context providers for participant management.

## Installation

Install via npm or yarn from the GitHub Package Registry. Ensure your project is configured to look for `@rssa-project` packages in the GitHub registry.

```bash
npm install @rssa-project/api
```

## Setup

Wrap your application (or the suitable part of your component tree) with `ParticipantProvider` and `StudyProvider`.

### 1. `ParticipantProvider`

Manages the participant's JWT. It persists the token to `localStorage` and provides it to the rest of the app.

- **`storageKeyPrefix`** (optional): A string to prefix the local storage key. Useful if hosting multiple studies on the same domain to prevent session collision.

### 2. `StudyProvider`

Initializes the `RssaClient` with your study's credentials.

- **`config`**: An object containing `apiUrlBase`, `apiKeyId`, `apiKeySecret`, and `studyId`.

### Example

```tsx
import { ParticipantProvider, StudyProvider } from '@rssa-project/api';

const config = {
	apiUrlBase: 'https://api.rssa-project.org', // Replace with your API URL
	apiKeyId: 'input-your-api-key-id',
	apiKeySecret: 'input-your-api-key-secret',
	studyId: 'input-your-study-id',
};

function App() {
	return (
		<ParticipantProvider storageKeyPrefix={config.studyId}>
			<StudyProvider config={config}>
				<YourAppContent />
			</StudyProvider>
		</ParticipantProvider>
	);
}
```

## Usage

### `useStudy` Hook

Access the `studentApi` instance (the `RssaClient`) to make authenticated requests.

```tsx
import { useStudy } from '@rssa-project/api';
import { useEffect, useState } from 'react';

const MyComponent = () => {
	const { studyApi } = useStudy();
	const [data, setData] = useState(null);

	useEffect(() => {
		// Example: Fetch strict typed data
		studyApi.get('/some/endpoint').then(setData).catch(console.error);
	}, [studyApi]);

	return <div>{JSON.stringify(data)}</div>;
};
```

### `useParticipant` Hook

Access or modify the current participant's session token directly.

```tsx
import { useParticipant } from '@rssa-project/api';

const LogoutButton = () => {
	const { setJwt } = useParticipant();
	return <button onClick={() => setJwt(null)}>Logout</button>;
};
```

### `useStudyConfig` Hook

Fetch the full configuration for the current study, including steps, pages, and conditions.

```tsx
import { useStudyConfig } from '@rssa-project/api';

const ConfigDisplay = () => {
	const { data: studyConfig, isLoading, error } = useStudyConfig();

	if (isLoading) return <p>Loading config...</p>;
	if (error) return <p>Error loading config</p>;

	return <h1>{studyConfig.name}</h1>;
};
```

## Error Handling

The library exports an `ApiError` class that extends the standard `Error` object. It includes the HTTP status code and the response body.

```typescript
import { ApiError } from '@rssa-project/api/api/RssaClient'; // Or import from index if exported

try {
	await studyApi.get('/protected-resource');
} catch (error) {
	if (error instanceof ApiError) {
		console.log(`Status: ${error.status}`);
		console.log('Body:', error.body);
	}
}
```

## Type Definitions

The library exports core types for the RSSA platform ecosystem, including:

- `Study`, `StudyStep`, `Page`
- `Participant`, `NewParticipant`
- `SurveyResponse`, `Feedback`, `Demographic`

Import them directly from the package:

```typescript
import { Study, Participant } from '@rssa-project/api';
```
