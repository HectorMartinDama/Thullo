import type { Label } from 'bits-ui';

export const ARROWS = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'];

export const MESSAGE_TYPE_BOARD = {
	public: {
		value: 'The board is public, anyone on the Internet can see it via the link.'
	},
	private: {
		value:
			'The board is private, but can be shared via a link. By sharing this board, all your lists and tasks will be visible.'
	}
};

export type Card = {
	icon: string;
	title: string;
	content: string;
};

export type Image = {
	urls: typeImage;
	description: string;
};

export type Priority = 1 | 2 | 3 | 4;

export type List = {
	id: string;
	title: string;
	tasks?: TaskItem[];
};

export type DateValue = {
	day: number;
	month: number;
	year: number;
};

export type TaskItem = {
	id: string;
	title: string;
	priority: Priority;
	createdAt: string;
	description?: string;
	user: User;
	dueDate?: string;
	attachments?: AttachmentType[];
	cover?: string;
	members: User[] | [];
	labels?: Label[];
};

export type Activity = {
	title: string;
	occured_on: string;
	user: {
		name: string;
		email: string;
		image: string;
	};
};

export type AttachmentType = {
	name: string;
	url: string;
	key: string;
	createdAt: Date;
	user: User;
};

export type Label = {
	_id: string;
	title: string;
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

export type Visibility = 'public' | 'private';

export type CreateListParams = {
	title: string;
};

export type DeleteListParams = {
	id: string;
};

export type CreateTaskParams = {
	id: string;
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

export type changePriorityParams = {
	priority: number;
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
