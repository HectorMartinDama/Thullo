import { addScript } from '$lib';
import {
	changePriorityTask,
	deleteTaskRequest,
	getBoardById,
	getTaskById
} from '$lib/requestsBackend';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';

export const load = async ({ cookies, params }) => {
	const authToken = cookies.get('AuthorizationToken');
	const task = await getTaskById(authToken, params.id);

	const board = await getBoardById(authToken, params.boardId);

	if (!task) error(404, 'Task not found');
	if (!board) error(404, 'Board not found');

	return { task, board, pageTitle: task.title };
};

export const actions: Actions = {
	changePriorityTask: async ({ request, cookies, params }) => {
		const authToken = cookies.get('AuthorizationToken');
		const taskId = params.id;
		const { priority } = Object.fromEntries(await request.formData());

		console.log(priority, taskId);
		if (!taskId) return fail(400, { taskId, missing: true });
		changePriorityTask(authToken, taskId, Number(priority));
		return { success: true };
	},
	deleteTask: async ({ request, cookies, params }) => {
		const authToken = cookies.get('AuthorizationToken');
		const { id, boardId } = params;
		if (!id) return fail(400, { id, missing: true });
		if (!boardId) return fail(400, { boardId, missing: true });
		const board = await getBoardById(authToken, boardId);
		await deleteTaskRequest(authToken, id, boardId);
		redirect(303, `/b/${boardId}/${addScript(board.title)}`);
	}
};
