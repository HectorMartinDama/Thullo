import type { Label } from 'bits-ui';

export const ARROWS = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'];

export type Image = {
	urls: typeImage;
	description: string;
};

export type List = {
	id: string;
	title: string;
	tasks?: TaskItem[];
};

export type TaskItem = {
	id: string;
	title: string;
	description?: string;
	attachments?: AttachmentType[];
	cover?: string;
	labels?: Label[];
};

export type AttachmentType = {
	name: string;
	url: string;
	key: string;
	createdAt: Date;
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
	description?: string;
	user?: User;
	members?: User[];
	favourites?: User[];
	lists?: List[];
};

export type User = {
	id: string;
	name: string;
	email: string;
	image: string;
};

export type Visibility = {
	private: string;
	public: string;
	workSpace: string;
};

export type CreateListParams = {
	title: string;
};

export type DeleteListParams = {
	id: string;
};

export type CreateTaskParams = {
	title: string;
	listId: string;
};

export type addCoverTaskParams = {
	cover: string;
	id: string;
};

export type addLabelTaskParams = {
	title: string;
	color: string;
	id: string;
};

export type addMemberParams = {
	email: string;
};

export type changeVisibilityParams = {
	visibility: string;
};

export type changeBackgroundParams = {
	background: string;
};
export type deleteBoardParams = {
	id: string;
};
