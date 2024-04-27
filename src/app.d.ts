// See https://kit.svelte.dev/docs/types#app

import type { Theme } from './hooks.server';

// for information about these interfaces
declare global {
	interface Document {
		startViewTransition?(callback: () => Promise<void>): void;
	}
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
		interface Platform {
			env: {
				COUNTER: DurableObjectNamespace;
			};
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache };
		}
	}
}

export {};
