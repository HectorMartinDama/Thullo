import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.auth();
	return { session: session, theme: event.locals.theme, token: event.locals.sessionToken };
};
