// place files you want to import through the `$lib` alias in this folder.

import type { List } from './types';

export const exampleBoard = [
	{
		id: 1,
		name: 'Todo',
		items: [
			{ id: 1, name: 'Welcome to Tullo!' },
			{ id: 2, name: 'This is a demo board' },
			{ id: 3, name: 'I am a task' }
		]
	},
	{
		id: 2,
		name: 'Doing',
		items: [
			{ id: 4, name: 'You can drag me anywhere in this list' },
			{ id: 5, name: 'And also to another list' }
		]
	},
	{
		id: 3,
		name: 'Done',
		items: [
			{ id: 46, name: 'Share the board' },
			{ id: 47, name: 'Login in Tullo' }
		]
	}
];

export const cards = [
	{
		icon: '🚀',
		title: 'Collaborative Boards',
		content: 'Share your Board and Lists in real-time with your team.'
	},
	{
		icon: '🖼️',
		title: 'Integrate with Unplash',
		content: 'Select your background image from millions of images.'
	},
	{
		icon: '⌨️',
		title: 'No title',
		content: 'Conasndsndnsdnsdnsd'
	}
];

export const initialBackgrounds = [
	'/background-peach.svg',
	'/background-ice.svg',
	'/background-wave.svg',
	'/background-crystallBall.svg',
	'/background-raimbow.svg'
];

export const allInitialsBackgrounds = [
	'/background-peach.svg',
	'/background-ice.svg',
	'/background-wave.svg',
	'/background-crystallBall.svg',
	'/background-raimbow.svg',
	'/background-flower.svg',
	'/background-earth.svg'
];

const unsplash = [
	'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1701962541409-e2c1256a8574',
	'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1545472956-3ebf777846cc',
	'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1699775292727-06fabf36730d',
	'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1701364406051-156d47df2477',
	'https://images.unsplash.com/photo-1701962541409-e2c1256a8574',
	'https://images.unsplash.com/photo-1545472956-3ebf777846cc',
	'https://images.unsplash.com/photo-1699775292727-06fabf36730d',
	'https://images.unsplash.com/photo-1701364406051-156d47df2477'
];

export const initialBackgroundsSmall = [
	'/background-peach.svg',
	'/background-ice.svg',
	'/background-wave.svg',
	'/background-crystallBall.svg',
	'/background-raimbow.svg'
];

export const labelColors = [
	'rgba(33, 150, 83, 1)',
	'rgba(242, 201, 76, 1)',
	'rgba(242, 153, 74, 1)',
	'rgba(235, 87, 87, 1)',
	'rgba(47, 128, 237, 1)',
	'rgba(86, 204, 242, 1)',
	'rgba(111, 207, 151, 1)',
	'rgba(51, 51, 51, 1)',
	'rgba(79, 79, 79, 1)',
	'rgba(130, 130, 130, 1)',
	'rgba(189, 189, 189, 1)',
	'rgba(224, 224, 224, 1)'
];

export const Lists: List[] = [
	{
		title: 'En progreso',
		id: '45aa172a-7f04-4efc-998c-01fcd6f47d7f',
		tasks: [
			{
				id: '4f359cf4-3b5b-453d-b606-3c152cacb77b',
				title: 'Task 1 - Progreso',
				description: 'Task 1 description',
				background:
					'https://res.cloudinary.com/dxeuxy7ik/image/upload/c_crop,g_auto,h_130,w_616/MicroserviceRabbitmqCommunicationDarkMode_jpfyos.jpg',
				labels: [
					{ title: 'Label 1', color: '#ff0000' },
					{ title: 'Label 2', color: '#00ff00' }
				]
			},
			{
				id: '82fd96fd-32e1-4e9b-a913-f1e47a013c0e',
				title: 'Task 2 - Progreso',
				description: 'Task 1 description',
				labels: [
					{ title: 'Label 1', color: '#ff0000' },
					{ title: 'Label 2', color: '#00ff00' }
				]
			},
			{
				id: '49df6b97-a073-4821-9347-c80a9d19250c',
				title: 'Task 3 - Progreso',
				description: 'Task 1 description',
				labels: [
					{ title: 'Label 1', color: '#ff0000' },
					{ title: 'Label 2', color: '#00ff00' }
				]
			}
		]
	},
	{
		title: 'Completado',
		id: '82587d44-a10d-4712-a9b8-907eab923364',
		tasks: [
			{
				id: '85cbbd1d-fe23-4ea2-bd8e-70e456733b91',
				title: 'Task 1 - Completado',
				description: 'Task 1 description',
				background: '/background-wave.svg',
				labels: [
					{ title: 'Label 1', color: '#ff0000' },
					{ title: 'Label 2', color: '#00ff00' }
				]
			},
			{
				id: 'c09139c1-8ea0-4e57-a469-bd72440a5485',
				title: 'Task 2 - Completado',
				description: 'Task 1 description',
				background: '/background-wave.svg',
				labels: [
					{ title: 'Label 1', color: '#ff0000' },
					{ title: 'Label 2', color: '#00ff00' }
				]
			},
			{
				id: 'e9b5d7c1-7b29-4d79-9d95-8d070220be01',
				title: 'Task 3 - Completado',
				description: 'Task 1 description',
				background: '/background-wave.svg',
				labels: [
					{ title: 'Label 1', color: '#ff0000' },
					{ title: 'Label 2', color: '#00ff00' }
				]
			}
		]
	}
];

export const addScript = (phrase: string): string => {
	return phrase.split(' ').join('-');
};
