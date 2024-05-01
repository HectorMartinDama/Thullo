import { SvelteKitAuth } from '@auth/sveltekit';
import google from '@auth/sveltekit/providers/google';
import type { Handle } from '@sveltejs/kit';
import { GOOGLE_ID, GOOGLE_SECRET, AUTH_SECRET } from '$env/static/private';

export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
	const authOptions = {
		providers: [
			google({
				clientId: GOOGLE_ID,
				clientSecret: GOOGLE_SECRET
			})
		],
		secret: AUTH_SECRET,
		trustHost: true
	};
	return authOptions;
}) satisfies Handle;
