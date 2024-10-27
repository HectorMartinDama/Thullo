import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { toast } from 'svelte-sonner';
import type { DateValue } from '@internationalized/date';
import { parse, format } from 'date-fns';

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export const CALENDAR_ITEMS = [
	{ value: 0, label: 'Today' },
	{ value: 1, label: 'Tomorrow' },
	{ value: 3, label: 'In 3 days' },
	{ value: 7, label: 'In a week' },
	{ value: 30, label: 'In a month' }
];

export const isImage = (url: string) => {
	return url.includes('jpg') || url.includes('png') || url.includes('jpeg') || url.includes('gif');
};

export const isArrayEmpty = (arr: any[]): boolean => {
	return arr.every((obj) => Object.keys(obj).length === 0);
};

export const parseDate = (fechaStr: string): DateValue | undefined => {
	// Validar el formato utilizando una expresión regular
	const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
	const match = fechaStr.match(regex);

	if (!match) {
		console.error("Formato de fecha inválido. Usa el formato 'día/mes/año'.");
		return undefined; // Si el formato es incorrecto, retorna undefined
	}

	// Extraer el día, mes y año del match
	const day = parseInt(match[1], 10);
	const month = parseInt(match[2], 10);
	const year = parseInt(match[3], 10);

	return {
		year: year,
		month: month,
		day: day
	};
};

export const formaDateToEuropean = (strDate: string): string => {
	// yyyy-dd-mm to dd/mm/yyyy
	const fecha: Date = parse(strDate, 'yyyy-MM-dd', new Date());
	return format(fecha, 'dd/MM/yyyy');
};

export const getDayMonth = (strDate: string) => {
	const date = new Date(strDate);
	const day = date.getDate();
	const month = MONTHS[date.getMonth()];
	return `${day} ${month}`;
};

export const formatDate = (strDate: string) => {
	const date = new Date(strDate);
	const day = date.getDate();
	const month = MONTHS[date.getMonth()];
	const year = date.getFullYear();

	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	return `${day} ${month} ${year} · ${hours}:${minutes}`;
};

export const differenceDays = (strDate: string): number => {
	const date = new Date(strDate);
	const hoy = new Date();
	hoy.setHours(0, 0, 0, 0);
	const fechaLimite = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	const diffTime = fechaLimite.getTime() - hoy.getTime();
	if (diffTime < 0) {
		return 0;
	}
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
	return diffDays;
};

export const replaceDashWithSpace = (text: string): string => {
	return text.replace(/-/g, ' ');
};

export const pushSuccessNotification = (title: string, description?: string) => {
	toast.success(title, {
		description,
		position: 'bottom-right',
		duration: 4000
	});
};

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};
