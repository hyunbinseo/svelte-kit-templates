import { initCloudflareSentryHandle, sentryHandle } from '@sentry/sveltekit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(
	initCloudflareSentryHandle({}), //
	sentryHandle()
);
