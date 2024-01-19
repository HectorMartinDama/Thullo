import type { Label } from 'bits-ui';

export type Image = {
	urls: typeImage;
	description: string;
};

export type List = {
	title: string;
	id: string;
	tasks?: TaskItem[];
};

export type TaskItem = {
	id: string;
	title: string;
	description?: string;
	attachaments?: Attachament[];
	background?: string;
	labels?: Label[];
};

export type Attachament = {
	title: string;
	createdAt: Date;
	source: string;
};

export type Label = {
	title: string;
	color: string;
};

export type typeImage = {
	raw: string;
	full: string;
	regular: string;
	small: string;
	thumb: string;
	small_s3: string;
};

export type Board = {
	id: string;
	title: string;
	background: string;
	visibility: Visibility;
	lists?: List[];
};

export type Visibility = {
	private: string;
	public: string;
	workSpace: string;
};
