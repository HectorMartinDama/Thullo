import type { User } from '@auth/core/types';
import type { Board } from './types';

export const saveBoard = async (authToken: string | undefined, board: Board) => {
	return await fetch('http://localhost:4000/boards', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify(board)
	});
};

export const getAllBoard = async (authToken: string | undefined) => {
	return await fetch('http://localhost:4000/boards', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		}
	}).then((res) => res.json());
};

export const saveUser = async (user: User) => {
	return await fetch(`http://localhost:4000/users`, {
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
	}).then((res) => res.json());
};
