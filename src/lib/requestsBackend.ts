import type { User } from '@auth/core/types';
import type { Board, List, TaskItem } from './types';

export const saveBoard = async (authToken: string | undefined, board: Board) => {
	return await fetch(`http://localhost:4000/boards/${board.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify(board)
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

export const getTaskById = async (authToken: string | undefined, id: string) => {
	return await fetch(`http://localhost:4000/tasks/${id}`, {
		method: 'GET',
		headers: {
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

export const createTask = async (
	authToken: string | undefined,
	listId: string,
	boardId: string,
	task: TaskItem
) => {
	return await fetch(`http://localhost:4000/tasks/${boardId}/${listId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify(task)
	});
};

export const deleteBoard = async (authToken: string | undefined, id: string) => {
	fetch(`http://localhost:4000/boards/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
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
	return await fetch(`http://localhost:4000/tasks/addCover/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify({ cover })
	});
};

export const addLabelTask = async (
	authToken: string | undefined,
	id: string,
	title: string,
	color: string
) => {
	fetch(`http://localhost:4000/tasks/addLabel/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify({ title, color })
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

export const updatePositionTask = (
	authToken: string | undefined,
	listId: string,
	id: string,
	tasksId: Array<string>
) => {
	fetch(`http://localhost:4000/tasks/${id}/updatePosition/${listId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify({ tasksId })
	});
};

export const addMember = async (authToken: string | undefined, boardId: string, email: string) => {
	return await fetch(`http://localhost:4000/boards/${boardId}/addMember`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify({ email })
	}).then((res) => {
		if (!res.ok) throw new Error('fetch failed');
	});
};

export const addAttachment = async (
	authToken: string | undefined,
	id: string,
	name: string,
	key: string,
	url: string
) => {
	return await fetch(`http://localhost:4000/tasks/addAttachment/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify({ name, url, key })
	}).then((res) => {
		if (!res.ok) throw new Error('fetch failed');
	});
};

export const changeVisibility = async (
	authToken: string | undefined,
	boardId: string,
	visibility: string
) => {
	return await fetch(`http://localhost:4000/boards/${boardId}/changeVisibility`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify({ visibility })
	});
};

export const changeBackgroundRequest = async (
	authToken: string | undefined,
	boardId: string,
	background: string
) => {
	return await fetch(`http://localhost:4000/boards/${boardId}/changeBackground`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify({ background })
	});
};

export const deleteAccount = async (authToken: string | undefined, email: string) => {
	return await fetch(`http://localhost:4000/users/${email}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		}
	});
};
