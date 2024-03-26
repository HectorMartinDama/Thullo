// todo: see this web article (https://dev.to/theether0/sveltekit-changes-session-and-cookies-enb)

import { addScript } from '$lib';
import { getAllBoard, saveBoard } from '$lib/requestsBackend';
import type { Board } from '$lib/types';
import { type Actions, redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const authToken = cookies.get('AuthorizationToken');
	return { boards: await getAllBoard(authToken) };
};

export const actions: Actions = {
	createBoard: async ({ request, cookies }) => {
		const authToken = cookies.get('AuthorizationToken');
		const { title, visibility, background } = Object.fromEntries(await request.formData()) as Board;
		const id = crypto.randomUUID();

		const board: Board = {
			id: id,
			title: title,
			background: background,
			visibility: visibility
		};

		console.log(board);

		await saveBoard(authToken, board);

		throw redirect(302, `/b/${id}/${await addScript(title)}`);
	}
};
