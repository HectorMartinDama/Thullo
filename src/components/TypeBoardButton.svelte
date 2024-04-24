<script lang="ts">
	import type { Board, Visibility } from '$lib/types';
	import { slide } from 'svelte/transition';
	import PrivateVisibilityIcon from './icons/PrivateVisibilityIcon.svelte';
	import PublicVisibilityIcon from './icons/PublicVisibilityIcon.svelte';
	import { page } from '$app/stores';
	import toast from 'svelte-french-toast';
	import type { SubmitFunction } from '@sveltejs/kit';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let visibility: Visibility;
	export let board: Board;
	let isOpen = false;

	const submitChangeVisibility: SubmitFunction = () => {
		return async ({ result, formData, update }) => {
			const visibility = formData.get('visibility');
			if (result.type === 'success') {
				dispatch('changeVisibility');
				isOpen = false;
				toast.success(`The board has changed to ${visibility}`, {
					position: 'bottom-right',
					duration: 8000
				});
			}
			update();
		};
	};
</script>

<div class="relative">
	<button
		disabled={$page.data.session?.user?.email === board.user.email ? false : true}
		on:click={() => (isOpen = !isOpen)}
		class="flex items-center justify-center text-center bg-[#F2F2F2] dark:bg-[#323940] h-[36px] w-[108px] rounded-[8px] text-sm gap-2 hover:bg-[#d0d4db] dark:hover:bg-[#3d4750] duration-150 transition-colors font-medium text-[#828282] dark:text-[#B6C2CF]"
	>
		{#if visibility === 'private'}
			<PrivateVisibilityIcon />
		{:else if visibility === 'public'}
			<PublicVisibilityIcon />
		{/if}

		{visibility}
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
			class="absolute flex flex-col justify-between z-10 left-0 mt-3 py-2 w-[256px] h-[200px] bg-white dark:bg-[#282E33] dark:text-[#B6C2CF] rounded-[12px] shadow-xl px-[12px]"
		>
			<header class="pb-[15px] pl-[5px]">
				<h3 class="font-semibold text-[#4F4F4F]">Visibility</h3>
				<span class="text-[#828282] font-normal text-sm">Choose who can see to this board.</span>
			</header>

			<form action="?/changeVisibility" method="post" use:enhance={submitChangeVisibility}>
				<input
					type="hidden"
					name="visibility"
					value={visibility === 'public' ? 'private' : 'public'}
				/>

				<!-- Public Visibility -->
				<button
					type="submit"
					disabled={visibility === 'public'}
					class="pl-[15px] h-[58px] w-full mb-[10px] rounded-[8px] hover:bg-[#F2F2F2] dark:hover:bg-[#323940] duration-150 transition-colors"
				>
					<header class="flex flex-col items-start gap-2">
						<h3
							class="font-medium text-[#4F4F4F] dark:text-[#B6C2CF] flex flex-row gap-2 text-normal"
						>
							<PublicVisibilityIcon />
							Public
						</h3>
						<span class="text-xs text-[#828282]">Anyone on the internet can see this.</span>
					</header>
				</button>

				<!-- Private Visibility -->
				<button
					type="submit"
					disabled={visibility === 'private'}
					class="pl-[15px] h-[58px] w-full mb-[10px] rounded-[8px] hover:bg-[#F2F2F2] dark:hover:bg-[#323940] duration-150 transition-colors"
				>
					<header class="flex flex-col items-start gap-2">
						<h3
							class="font-medium text-[#4F4F4F] dark:text-[#B6C2CF] flex flex-row gap-2 text-normal"
						>
							<PrivateVisibilityIcon />
							Private
						</h3>
						<span class="text-[#828282] text-xs">Only board members can see this.</span>
					</header>
				</button>
			</form>
		</div>
	{/if}
</div>
