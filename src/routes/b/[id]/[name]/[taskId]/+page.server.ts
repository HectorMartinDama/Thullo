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
	const task = await getTaskById(authToken, params.taskId);

	const board = await getBoardById(authToken, params.id);

	if (!task) error(404, 'Task not found');
	if (!board) error(404, 'Board not found');

	return { task, board, pageTitle: task.title };
};

export const actions: Actions = {
	changePriorityTask: async ({ request, cookies, params }) => {
		const authToken = cookies.get('AuthorizationToken');
		const taskId = params.taskId;
		const { priority } = Object.fromEntries(await request.formData());

		console.log(priority, taskId);
		if (!taskId) return fail(400, { taskId, missing: true });
		changePriorityTask(authToken, taskId, Number(priority));
		return { success: true };
	},
	deleteTask: async ({ request, cookies, params }) => {
		const authToken = cookies.get('AuthorizationToken');
		const { taskId, id } = params;
		if (!taskId) return fail(400, { id, missing: true });
		if (!id) return fail(400, { id, missing: true });
		const board = await getBoardById(authToken, id);
		await deleteTaskRequest(authToken, id, id);
		redirect(303, `/b/${id}/${addScript(board.title)}`);
	}
};
