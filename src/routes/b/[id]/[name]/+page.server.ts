// Aqui debo de recuperar los datos del tablero creado

import {
	addCoverTask,
	addLabelTask,
	addMember,
	changeBackgroundRequest,
	changeVisibility,
	createList,
	createTask,
	deleteBoard,
	deleteList,
	getBoardById,
	saveBoard
} from '$lib/requestsBackend';
import type {
	Board,
	CreateListParams,
	CreateTaskParams,
	DeleteListParams,
	List,
	addCoverTaskParams,
	addLabelTaskParams,
	addMemberParams,
	changeBackgroundParams,
	changeVisibilityParams
} from '$lib/types.js';
import { error, type Actions, fail, redirect } from '@sveltejs/kit';
import { isValidTheme } from '../../../../hooks.server';
import { addScript } from '$lib';

export const load = async ({ cookies, params }) => {
	const authToken = cookies.get('AuthorizationToken');
	const board = await getBoardById(authToken, params.id);

	if (!board) error(404, 'Board not found');
	return { board, pageTitle: board.title };
};

export const actions: Actions = {
	theme: async ({ cookies, request }) => {
		const data = await request.formData();
		const theme = data.get('theme');
		if (!isValidTheme(theme)) {
			return fail(400, { theme, missing: true });
		}
		cookies.set('theme', theme, { path: '/' });
		return { success: true };
	},
	createList: async ({ request, cookies, params }) => {
		const authToken = cookies.get('AuthorizationToken');
		const boardId = params.id;
		const { title } = Object.fromEntries(await request.formData()) as CreateListParams;

		if (!boardId) return fail(400, { boardId, missing: true });

		const list: List = {
			id: crypto.randomUUID(),
			title: title.trim()
		};
		await createList(authToken, boardId, list);
		return { success: true };
	},
	deleteList: async ({ request, cookies, params }) => {
		const authToken = cookies.get('AuthorizationToken');
		const { id } = Object.fromEntries(await request.formData()) as DeleteListParams;
		console.log('esto es el id de la lista a eliminar: ', params.id);
		await deleteList(authToken, id);
	},
	deleteBoard: async ({ cookies, params }) => {
		const authToken = cookies.get('AuthorizationToken');
		if (params.id) await deleteBoard(authToken, params.id);
		redirect(303, '/');
	},
	createTask: async ({ request, cookies, params }) => {
		const authToken = cookies.get('AuthorizationToken');
		const { title, id, listId } = Object.fromEntries(await request.formData()) as CreateTaskParams;
		console.log(title, listId, params.id, 'id desde frontend', id);
		if (listId) {
			const task = {
				id,
				title: title.trim()
			};
			if (params.id) await createTask(authToken, listId, params.id, task);
		}
	},
	addCoverTask: async ({ request, cookies }) => {
		const authToken = cookies.get('AuthorizationToken');
		const { cover, id } = Object.fromEntries(await request.formData()) as addCoverTaskParams;
		console.log('datos recogidos del formulario', cover, id);
		await addCoverTask(authToken, id, cover);
	},
	addLabelTask: async ({ request, cookies }) => {
		const authToken = cookies.get('AuthorizationToken');
		const { title, color, id } = Object.fromEntries(await request.formData()) as addLabelTaskParams;
		console.log('datos recogidos del formulario', title, color, id);
		await addLabelTask(authToken, id, title, color);
	},
	addMember: async ({ request, cookies, params }) => {
		const authToken = cookies.get('AuthorizationToken');
		const { email } = Object.fromEntries(await request.formData()) as addMemberParams;
		console.log(email, params.id);
		if (params.id) await addMember(authToken, params.id, email);
	},
	changeVisibility: async ({ request, cookies, params }) => {
		const authToken = cookies.get('AuthorizationToken');
		const { visibility } = Object.fromEntries(await request.formData()) as changeVisibilityParams;
		if (params.id) await changeVisibility(authToken, params.id, visibility);
		return { success: true };
	},
	changeBackground: async ({ request, cookies, params }) => {
		const authToken = cookies.get('AuthorizationToken');
		const { background } = Object.fromEntries(await request.formData()) as changeBackgroundParams;
		console.log(background);
		if (params.id) await changeBackgroundRequest(authToken, params.id, background);
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

		throw redirect(307, `./b/${board.id}/${addScript(title)}`);
	}
};
