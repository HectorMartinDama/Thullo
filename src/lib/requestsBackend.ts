import { PUBLIC_URL_API } from '$env/static/public';
import type { User } from '@auth/core/types';
import type { Board, List, TaskItem } from './types';

export const saveBoard = async (authToken: string | undefined, board: Board) => {
	return await fetch(`${PUBLIC_URL_API}/boards/${board.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify(board)
	});
};

export const getAllBoard = async (authToken: string | undefined): Promise<Board[]> => {
	return await fetch(`${PUBLIC_URL_API}/boards`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	}).then((res) => res.json());
};

//getAllBoardAny

export const getAllBoardAny = async () => {
	return await fetch(`${PUBLIC_URL_API}/boards`, {
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
	return await fetch(`${PUBLIC_URL_API}/boards/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		}
	}).then((res) => {
		if (res.ok) return res.json();
	});
};

export const addFavourite = async (authToken: string | undefined, id: string) => {
	return await fetch(`${PUBLIC_URL_API}/boards/${id}/addFavourite`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		}
	});
};

export const removeFavourite = async (authToken: string | undefined, id: string) => {
	return await fetch(`${PUBLIC_URL_API}/boards/favourites/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	});
};

export const getTaskById = async (authToken: string | undefined, id: string) => {
	return await fetch(`${PUBLIC_URL_API}/tasks/${id}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	}).then((res) => {
		if (res.ok) return res.json();
	});
};

export const saveUser = async (user: User) => {
	fetch(`${PUBLIC_URL_API}/users`, {
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
	return await fetch(`${PUBLIC_URL_API}/users/login/${email}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => {
		if (res.ok) return res.json();
	});
};

export const createList = async (authToken: string | undefined, boardId: string, list: List) => {
	return await fetch(`${PUBLIC_URL_API}/lists/${boardId}`, {
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
	return await fetch(`${PUBLIC_URL_API}/tasks/${boardId}/${listId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify(task)
	});
};

export const deleteBoard = async (authToken: string | undefined, id: string) => {
	fetch(`${PUBLIC_URL_API}/boards/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	});
};

export const deleteList = async (authToken: string | undefined, id: string) => {
	fetch(`${PUBLIC_URL_API}/lists/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	});
};

export const addCoverTask = async (authToken: string | undefined, id: string, cover: string) => {
	return await fetch(`${PUBLIC_URL_API}/tasks/addCover/${id}`, {
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
	fetch(`${PUBLIC_URL_API}/tasks/addLabel/${id}`, {
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
	fetch(`${PUBLIC_URL_API}/lists/updateOrder/${boardId}`, {
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
	fetch(`${PUBLIC_URL_API}/tasks/${id}/updatePosition/${listId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify({ tasksId })
	});
};

export const addMember = async (authToken: string | undefined, boardId: string, email: string) => {
	return await fetch(`${PUBLIC_URL_API}/boards/${boardId}/addMember`, {
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
	return await fetch(`${PUBLIC_URL_API}/tasks/addAttachment/${id}`, {
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
	return await fetch(`${PUBLIC_URL_API}/boards/${boardId}/changeVisibility`, {
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
	return await fetch(`${PUBLIC_URL_API}/boards/${boardId}/changeBackground`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify({ background })
	});
};

export const deleteAccount = async (authToken: string | undefined, email: string) => {
	return await fetch(`${PUBLIC_URL_API}/users/${email}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		}
	});
};

export const renameTitleBoard = async (
	authToken: string | undefined,
	id: string,
	title: string
) => {
	return await fetch(`${PUBLIC_URL_API}/boards/rename/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify({ title })
	});
};

export const renameTitleList = async (authToken: string | undefined, id: string, title: string) => {
	return await fetch(`${PUBLIC_URL_API}/lists/rename/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify({ title })
	});
};
