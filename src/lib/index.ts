// place files you want to import through the `$lib` alias in this folder.

import type { List } from './types';

export const initialBackgrounds = [
	'https://images.unsplash.com/photo-1545472956-3ebf777846cc',
	'https://images.unsplash.com/photo-1701962541409-e2c1256a8574',
	'https://images.unsplash.com/photo-1699775292727-06fabf36730d',
	'https://images.unsplash.com/photo-1701364406051-156d47df2477',
	'/background-ice.svg',
	'/background-wave.svg',
	'/background-crystallBall.svg',
	'/background-raimbow.svg'
];

export const labelColors = [
	'#219653',
	'#F2C94C',
	'#F2994A',
	'#EB5757',
	'#2F80ED',
	'#56CCF2',
	'#6FCF97',
	'#333333',
	'#4F4F4F',
	'#828282',
	'#BDBDBD',
	'#E0E0E0'
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
