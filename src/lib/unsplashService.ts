import { PUBLIC_ACCESS_KEY_UNSPLASH } from '$env/static/public';

export const getPhotoByQuery = async (query: string) => {
	return await fetch(
		`https://api.unsplash.com/search/photos?query=${query}&client_id=${PUBLIC_ACCESS_KEY_UNSPLASH}&per_page=10`
	).then((res) => res.json());
};
