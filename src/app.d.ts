// See https://kit.svelte.dev/docs/types#app

import type { Theme } from './hooks.server';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			theme: 'light' | 'dark' | 'auto';
			sessionToken: string | undefined;
		}
		interface PageData {
			theme: Theme;
			sessionToken: string | undefined;
		}
		// interface Platform {}
	}
}

export {};
