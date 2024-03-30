import type { User } from '@auth/core/types';
import type { Board, List, TaskItem } from './types';

export const saveBoard = async (authToken: string | undefined, board: Board) => {
	return await fetch('http://localhost:4000/boards', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify({
			id: crypto.randomUUID(),
			title: board.title,
			background: board.background,
			visibility: board.visibility
		})
	});
};

export const getAllBoard = async (authToken: string | undefined): Promise<Board[]> => {
	return await fetch('http://localhost:4000/boards', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	}).then((res) => res.json());
};

//getAllBoardAny

export const getAllBoardAny = async () => {
	return await fetch('http://localhost:4000/boards', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => {
		if (res.ok) {
			return res.json();
		} else {
			console.log(res.statusText);
		}
	});
};

export const getBoardById = async (authToken: string | undefined, id: string) => {
	return await fetch(`http://localhost:4000/boards/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		}
	}).then((res) => {
		if (res.ok) return res.json();
	});
};

export const saveUser = async (user: User) => {
	fetch('http://localhost:4000/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id: crypto.randomUUID(),
			name: user.name,
			email: user.email,
			image: user.image
		})
	});
};

export const loginUser = async (email: string) => {
	return await fetch(`http://localhost:4000/users/login/${email}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => {
		if (res.ok) return res.json();
	});
};

export const createList = async (authToken: string | undefined, boardId: string, list: List) => {
	return await fetch(`http://localhost:4000/lists/${boardId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify(list)
	});
};

export const createTask = async (authToken: string | undefined, listId: string, task: TaskItem) => {
	return await fetch(`http://localhost:4000/tasks/${listId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify(task)
	});
};

export const deleteList = async (authToken: string | undefined, id: string) => {
	fetch(`http://localhost:4000/lists/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	});
};

export const addCoverTask = async (authToken: string | undefined, id: string, cover: string) => {
	fetch(`http://localhost:4000/tasks/addCover/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify({ cover })
	});
};

export const updateOrderList = (
	authToken: string | undefined,
	boardId: string,
	listsId: Array<string>
) => {
	fetch(`http://localhost:4000/lists/updateOrder/${boardId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify({ listsId })
	});
};
