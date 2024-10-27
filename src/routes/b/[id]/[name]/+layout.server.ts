import { getBoardById } from '$lib/requestsBackend';
import { error } from '@sveltejs/kit';

export const load = async ({ cookies, params }) => {
	const authToken = cookies.get('AuthorizationToken');
	const { id } = params;
	const board = await getBoardById(authToken, id);

	if (!board) error(404, 'Board not found');
	return { board, pageTitle: board.title };
};
