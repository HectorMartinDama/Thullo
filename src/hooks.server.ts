import { SvelteKitAuth } from '@auth/sveltekit';
import Github from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import {
	AUTH_SECRET,
	GITHUB_ID,
	GITHUB_SECRET,
	GOOGLE_ID,
	GOOGLE_SECRET
} from '$env/static/private';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { loginUser, saveUser } from '$lib/requestsBackend';

export type Theme = 'light' | 'dark' | 'auto';

export const isValidTheme = (theme: FormDataEntryValue | null): theme is string =>
	!!theme && (theme === 'light' || theme === 'dark' || theme === 'auto');

const authorization = async ({ event, resolve }) => {
	const session = await event.locals.getSession(); // get the
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
		console.log(token);
	}

	if (event.url.pathname.startsWith('/boards')) {
		if (!session) throw redirect(303, '/auth');
	}
	return resolve(event);
};

const setTheme = async ({ event, resolve }) => {
	const theme = event.cookies.get('theme') ?? 'light';
	if (!isValidTheme(theme)) {
		event.locals.theme = theme;
	}
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%THEME%', theme)
	});
	return response;
};

export const handle: Handle = sequence(
	SvelteKitAuth({
		providers: [
			Github({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
			Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })
		],
		secret: AUTH_SECRET,
		trustHost: true
	}),
	authorization,
	setTheme
);
