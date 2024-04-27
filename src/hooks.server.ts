import { redirect, type Handle } from '@sveltejs/kit';
import { loginUser, saveUser } from '$lib/requestsBackend';
import { sequence } from '@sveltejs/kit/hooks';
import { handle as authenticationHandle } from './auth';

export type Theme = 'light' | 'dark' | 'auto';

export const isValidTheme = (theme: FormDataEntryValue | null): theme is Theme =>
	!!theme && (theme === 'light' || theme === 'dark' || theme === 'auto');

const authorization = async ({ event, resolve }) => {
	const session = await event.locals.auth(); // get the
	if (session) {
		await saveUser(session.user);
		const { token } = await loginUser(session.user.email);

		// save the token
		if (token) {
			event.locals.sessionToken = token; // save the token in the frontend
			await event.cookies.set('AuthorizationToken', token, {
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 // 1 day
			}); // in the server
		}
	}

	if (event.url.pathname.startsWith('/boards')) {
		if (!session) redirect(303, '/');
	}
	return resolve(event);
};

const setTheme = async ({ event, resolve }) => {
	const theme = event.cookies.get('theme') ?? 'auto';

	if (isValidTheme(theme)) {
		event.locals.theme = theme;
	}
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%THEME%', theme)
	});
	return response;
};

export const handle: Handle = sequence(authenticationHandle, authorization, setTheme);
