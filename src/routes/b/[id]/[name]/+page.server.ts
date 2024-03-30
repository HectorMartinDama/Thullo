// Aqui debo de recuperar los datos del tablero creado

import { addScript } from '$lib';
import {
	addCoverTask,
	createList,
	createTask,
	deleteList,
	getBoardById
} from '$lib/requestsBackend';
import type { List } from '$lib/types.js';
import { error, type Actions, redirect } from '@sveltejs/kit';

export const load = async ({ cookies, params }) => {
	const authToken = cookies.get('AuthorizationToken');
	const board = await getBoardById(authToken, params.id);

	if (!board) throw error(404, 'Board not found');
	return { board, pageTitle: board.title };
};

export const actions: Actions = {
	createList: async ({ request, cookies, params }) => {
		const authToken = cookies.get('AuthorizationToken');
		const { title } = Object.fromEntries(await request.formData()) as List;

		const boardId = params.id;

		if (boardId) {
			const list: List = {
				id: crypto.randomUUID(),
				title: title
			};
			await createList(authToken, boardId, list);
		}
	},
	deleteList: async ({ request, cookies, params }) => {
		const authToken = cookies.get('AuthorizationToken');
		const { id } = Object.fromEntries(await request.formData()) as List;
		console.log('esto es el id de la lista a eliminar: ', params.id);
		await deleteList(authToken, id);
		throw redirect(302, `/b/${params.id}/${await addScript(params.name)}`);
	},
	createTask: async ({ request, cookies }) => {
		const authToken = cookies.get('AuthorizationToken');
		const { title, listId } = Object.fromEntries(await request.formData()) as unknown;
		console.log(title, listId);
		if (listId) {
			const task = {
				id: crypto.randomUUID(),
				title: title
			};
			await createTask(authToken, listId, task);
		}
	},
	addCoverTask: async ({ request, cookies }) => {
		const authToken = cookies.get('AuthorizationToken');
		const { cover, id } = Object.fromEntries(await request.formData()) as unknown;
		console.log('datos recogidos del formulario', cover, id);
		await addCoverTask(authToken, id, cover);
	}
};
