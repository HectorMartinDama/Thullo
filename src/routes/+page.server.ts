import { fail, type Actions } from '@sveltejs/kit';
import { isValidTheme } from '../hooks.server';
import { getAllBoard } from '$lib/requestsBackend';
import type { Board } from '$lib/types';

export const actions: Actions = {
	theme: async ({ cookies, request }) => {
		const data = await request.formData();
		const theme = data.get('theme');
		console.log('theme', data.get('theme'));

		if (!isValidTheme(theme)) {
			return fail(400, { theme, missing: true });
		}
		cookies.set('theme', theme, { path: '/' });
		return { success: true };
	},
	search: async ({ request, cookies }) => {
		const authToken = cookies.get('AuthorizationToken');
		//const { searchBoards } = Object.fromEntries(await request.formData());
		const boards = await getAllBoard(authToken);
		//console.log(boards.filter((board) => board.title.toLowerCase() === 'Prueba de tablero'));
		return boards;
	}
};
