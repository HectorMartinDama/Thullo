import { SvelteKitAuth } from '@auth/sveltekit';
import google from '@auth/sveltekit/providers/google';
import type { Handle } from '@sveltejs/kit';

export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
	const authOptions = {
		providers: [
			google({
				clientId: '650959382415-rpfc0u57nr9akl9ojcvgmd93p81fc94j.apps.googleusercontent.com',
				clientSecret: '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'
			})
		],
		secret: '031bcf41bb62b975af72cc47b37a3d6d2e8dd9cdf177b9dc2b9392abbaecb91f',
		trustHost: true
	};
	return authOptions;
}) satisfies Handle;
