import { PUBLIC_ACCESS_KEY_UNSPLASH } from '$env/static/public';
import type { Image } from './types';

export const getPhotoByQuery = async (query: string): Promise<Image[]> => {
	return await fetch(
		`https://api.unsplash.com/search/photos?query=${query}&client_id=${PUBLIC_ACCESS_KEY_UNSPLASH}&per_page=20`
	)
		.then((res) => res.json())
		.then((data) => data.results);
};

export const getRandomImages = async (count: number): Promise<void> => {
	return await fetch(
		`https://api.unsplash.com/photos/random?client_id=${PUBLIC_ACCESS_KEY_UNSPLASH}&count=${count}`
	).then((res) => res.json());
};
