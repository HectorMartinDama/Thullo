import { getAllBoard } from '$lib/requestsBackend';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();
	if (session?.user) throw redirect(303, '/boards');
	return { session: session, theme: event.locals.theme, token: event.locals.sessionToken };
};

export const actions: Actions = {
	search: async ({ request, cookies }) => {
		const authToken = cookies.get('AuthorizationToken');
		const { searchBoards } = Object.fromEntries(await request.formData());
		const boards = await getAllBoard(authToken);
		return boards;
	}
};
