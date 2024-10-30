<script lang="ts">
	import type { Board } from '$lib/types';
	import AboutThisBoard from './AboutThisBoard.svelte';
	import BackIcon from './icons/BackIcon.svelte';
	import ChangeBackground from './ChangeBackground.svelte';
	import DeleteBoard from './DeleteBoard.svelte';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import ArchivedItems from './ArchivedItems.svelte';
	import BoardActivity from './BoardActivity.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { buttonVariants } from '$lib/components/ui/button';
	import { TrashIcon, InfoIcon, ActivityIcon, FolderIcon, Ellipsis } from 'lucide-svelte';

	const dispatch = createEventDispatcher();

	export let board: Board;
	let descriptionValue: string;
	let isOpen = false;
	let isSubMenuOpen = false;
	let subsubMenu = false;
	let showSelectBackgroundColors = false;
	let componentActive: string;

	$: if (board.description) descriptionValue = board.description;

	const toggleSidebar = () => {
		isOpen = !isOpen;
	};

	const showComponent = (component: string) => {
		isSubMenuOpen = true;
		componentActive = component;
	};

	const back = () => {
		isSubMenuOpen = false;
	};

	const resetSubMenu = () => {
		isSubMenuOpen = false;
	};
</script>

<Sheet.Root onOpenChange={resetSubMenu}>
	<Sheet.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
		<Ellipsis class="h-4 w-4" />
	</Sheet.Trigger>
	<Sheet.Content class="w-[350px] dark:bg-[#1d2125]">
		<Sheet.Header class="flex flex-row justify-between items-center mb-5 ">
			{#if isSubMenuOpen}
				<button on:click={back}>
					<BackIcon />
				</button>

				<h3 class="text-[#333333] dark:text-[#B6C2CF] font-semibold text-sm">
					{componentActive}
				</h3>
			{:else}
				<Sheet.Title class="text-sm">Menu</Sheet.Title>
			{/if}
			<hr />
		</Sheet.Header>
		{#if !isSubMenuOpen}
			<ul class="w-full gap-2">
				<button
					on:click={() => showComponent('About this board')}
					class="flex items-center px-3 font-medium text-[13px] h-[35.5px] w-full hover:bg-[#f5f5f5] dark:hover:bg-[#2a3035] rounded-lg mb-3 transition-colors duration-150 gap-1"
				>
					<InfoIcon class="mr-2 h-4 w-4" />
					About this board
					<button />
				</button>

				<button
					on:click={() => showComponent('Change background')}
					class="flex items-center px-3 font-medium text-[13px] w-full h-[35.5px] hover:bg-[#f5f5f5] dark:hover:bg-[#2a3035] rounded-lg mb-3 transition-colors duration-150 gap-1"
				>
					<div
						class="mr-2 h-4 w-4 rounded-[4px] bg-center object-cover"
						style="background-image: url({board.background});"
					></div>
					Change background
					<button />
				</button>

				<button
					on:click={() => showComponent('Activity')}
					class="flex items-center px-3 font-medium text-[13px] h-[35.5px] w-full hover:bg-[#f5f5f5] dark:hover:bg-[#2a3035] rounded-lg mb-3 transition-colors duration-150 gap-1"
				>
					<ActivityIcon class="mr-2 h-4 w-4" />
					Activity
					<button />
				</button>

				<button
					on:click={() => showComponent('Delete')}
					class="flex items-center px-3 font-medium text-[13px] w-full h-[35.5px] hover:bg-[#f5f5f5] dark:hover:bg-[#2a3035] rounded-lg mb-3 transition-colors duration-150 gap-1"
				>
					<TrashIcon class="mr-2 h-4 w-4 stroke-[#b03d32]" />
					Delete Board
					<button />
				</button>

				<button
					on:click={() => showComponent('Archived Items')}
					class="flex items-center px-3 font-medium text-[13px] w-full h-[35.5px] hover:bg-[#f5f5f5] dark:hover:bg-[#2a3035] rounded-lg mb-3 transition-colors duration-150 gap-1"
				>
					<FolderIcon class="mr-2 h-4 w-4 " />
					Archived items
					<button />
				</button>
			</ul>
		{:else if componentActive === 'Change background'}
			<ChangeBackground on:changeBackground={() => dispatch('updateBackground')} />
		{:else if componentActive === 'About this board'}
			<AboutThisBoard {board} />
		{:else if componentActive === 'Activity'}
			<BoardActivity />
		{:else if componentActive === 'Delete'}
			<DeleteBoard boardName={board.title} />
		{:else if componentActive === 'Archived Items'}
			<ArchivedItems />
		{/if}
	</Sheet.Content>
</Sheet.Root>

<style>
	.content {
		height: calc(100% - 68px);
	}
</style>
