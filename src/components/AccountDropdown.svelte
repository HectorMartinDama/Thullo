<script lang="ts">
	import { page } from '$app/stores';
	import { enhance, applyAction } from '$app/forms';
	import { signOut } from '@auth/sveltekit/client';
	import LogoutIcon from './icons/LogoutIcon.svelte';

	import { slide } from 'svelte/transition'; // Importa la transición 'fade' de Svelte
	import { browser } from '$app/environment';
	import type { Theme } from '../hooks.server';
	import { theme } from '$lib/stores/theme';
	import ThemeIcon from './ThemeIcon.svelte';
	import SettingsIcon from './icons/SettingsIcon.svelte';

	let isOpen = false;
	let profileImageLoaded = true;

	const deriveNextTheme = (theme: Theme): Theme => {
		switch (theme) {
			case 'dark':
				return 'light';
			case 'light':
				return 'dark';
			case 'auto':
			default:
				if (!browser) return 'auto';
				return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
		}
	};

	const handleImageProfileError = () => {
		profileImageLoaded = false;
	};

	$: nextTheme = deriveNextTheme($theme);
</script>

<div class="relative">
	<button
		on:click={() => (isOpen = !isOpen)}
		class="block h-9 w-9 rounded-full overflow-hidden focus:outline-none"
	>
		{#if profileImageLoaded}
			<img
				src={$page.data.session?.user?.image}
				alt="profile picture"
				class="h-full w-full object-cover"
				on:error={handleImageProfileError}
			/>
		{:else}
			<div class="h-full w-full bg-gray-300 flex items-center justify-center">
				<p class="text-[black]">{$page.data.session?.user?.name?.split('')[0]}</p>
			</div>
		{/if}
	</button>

	{#if isOpen}
		<button
			on:click={() => (isOpen = false)}
			tabindex="-1"
			class="fixed inset-0 h-full w-full cursor-default"
		></button>
	{/if}
	{#if isOpen}
		<div
			transition:slide={{ duration: 250 }}
			class="absolute z-10 mt-[20px] right-0 py-2 px-4 w-56 bg-white text-[black] dark:bg-[#282E33] dark:text-[#B6C2CF] rounded-[8px] shadow-xl"
			id="menu"
		>
			<a
				href="/settings"
				class="flex items-center gap-3 px-4 py-2 mb-[5px] transition-colors duration-150 hover:bg-[#f0f1f4] dark:hover:bg-[#323940] rounded-[8px]"
			>
				<SettingsIcon />
				Settings
			</a>

			<div
				class="block items-center px-4 py-2 transition-colors duration-150 hover:bg-[#f0f1f4] dark:hover:bg-[#323940] rounded-[8px]"
			>
				<form
					method="POST"
					action="?/theme"
					use:enhance={async () => {
						$theme = nextTheme;
						return async ({ result }) => {
							await applyAction(result);
						};
					}}
				>
					<input type="hidden" name="theme" value={nextTheme} />
					<button class="w-full h-full flex flex-row items-center gap-3">
						<div class="w-5 h-5">
							<ThemeIcon />
						</div>
						{#if nextTheme === 'light'}
							Light
						{:else if nextTheme === 'dark'}
							Dark
						{/if}
					</button>
				</form>
			</div>

			<div class="block px-4 py-2"></div>

			<hr class="py-[5px]" />

			<div
				class="block px-4 py-2 transition-colors duration-150 hover:bg-[#f0f1f4] dark:hover:bg-[#323940] rounded-[8px]"
			>
				<button on:click={() => signOut({ callbackUrl: '/' })} class="flex items-center gap-3">
					<LogoutIcon />
					Log out
				</button>
			</div>
		</div>
	{/if}
</div>
