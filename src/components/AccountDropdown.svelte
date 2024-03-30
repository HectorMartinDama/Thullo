<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { signOut } from '@auth/sveltekit/client';

	let isOpen = false;
	let nextTheme: string;
</script>

<div class="relative">
	<button
		on:click={() => (isOpen = !isOpen)}
		class="block h-9 w-9 rounded-full overflow-hidden focus:outline-none"
	>
		<img
			src={$page.data.session?.user?.image}
			alt="profile picture"
			class="h-full w-full object-cover"
		/>
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
			class="absolute right-0 mt-2 py-2 w-56 bg-white dark:bg-[#282E33] dark:text-[#B6C2CF] rounded-[8px] shadow-xl"
		>
			<a href="" class="block px-4 py-2 hover:bg-indigo-500">Prueba</a>

			<div class="block px-4 py-2 hover:bg-indigo-500">
				<form
					method="POST"
					action="/?/theme"
					use:enhance={({ formData }) => {
						formData.append('theme', nextTheme);
						const htmlElement = document.querySelector('html');
						if (!htmlElement) return;
						htmlElement.setAttribute('data-theme', nextTheme);
						htmlElement.classList.toggle($page.data.theme);
					}}
				>
					<button on:click={() => (nextTheme = 'light')}>Light</button>
				</form>
			</div>

			<div class="block px-4 py-2">
				<form
					method="POST"
					action="/?/theme"
					use:enhance={({ formData }) => {
						formData.append('theme', nextTheme);
						const htmlElement = document.querySelector('html');
						if (!htmlElement) return;
						htmlElement.setAttribute('data-theme', nextTheme);
						htmlElement.classList.toggle($page.data.theme);
					}}
				>
					<button on:click={() => (nextTheme = 'dark')}>Dark</button>
				</form>
			</div>

			<div class="block px-4 py-2"></div>

			<hr />

			<div class="block px-4 py-2">
				<button on:click={() => signOut({ callbackUrl: '/auth' })}>Log out</button>
			</div>
		</div>
	{/if}
</div>
