// todo: see this web article (https://dev.to/theether0/sveltekit-changes-session-and-cookies-enb)

import { addScript } from '$lib';
import { getAllBoard, saveBoard } from '$lib/requestsBackend';
import type { Board } from '$lib/types';
import { type Actions, redirect, fail } from '@sveltejs/kit';
import { isValidTheme } from '../../hooks.server';

export const load = async (event) => {
	const session = await event.locals.auth();
	if (!session?.user) redirect(303, '/');
	const authToken = event.cookies.get('AuthorizationToken');
	return { boards: getAllBoard(authToken) };
};

export const actions: Actions = {
	theme: async ({ cookies, request }) => {
		const data = await request.formData();
		const theme = data.get('theme');
		console.log('paso por aqui');
		if (!isValidTheme(theme)) {
			return fail(400, { theme, missing: true });
		}
		cookies.set('theme', theme, { path: '/' });
		return { success: true };
	},
	createBoard: async ({ request, cookies }) => {
		const authToken = cookies.get('AuthorizationToken');
		const { title, visibility, background, description } = Object.fromEntries(
			await request.formData()
		) as Board;

		const board: Board = {
			id: crypto.randomUUID(),
			title: title,
			background: background,
			visibility: visibility,
			description: description
		};

		await saveBoard(authToken, board);

		redirect(302, `/b/${board.id}/${addScript(title)}`);
	}
};
