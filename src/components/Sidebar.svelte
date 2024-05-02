<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import CloseIcon from './icons/CloseIcon.svelte';
	import { quintInOut } from 'svelte/easing';
	import type { Board } from '$lib/types';
	import NoteIcon from './icons/NoteIcon.svelte';
	import OptionsIcon from './icons/OptionsIcon.svelte';
	import InfoIcon from './icons/InfoIcon.svelte';
	import ActivityIcon from './icons/ActivityIcon.svelte';
	import TrashIcon from './icons/TrashIcon.svelte';
	import AboutThisBoard from './AboutThisBoard.svelte';
	import BackIcon from './icons/BackIcon.svelte';
	import ChangeBackground from './ChangeBackground.svelte';
	import DeleteBoard from './DeleteBoard.svelte';
	import { createEventDispatcher } from 'svelte';

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
</script>

<button
	on:click={() => toggleSidebar()}
	class="flex items-center justify-center text-center bg-[#F2F2F2] dark:bg-[#323940] h-[36px] w-[117px] rounded-[8px] text-sm gap-2 hover:bg-[#d0d4db] dark:hover:bg-[#3d4750] duration-150 transition-colors font-medium text-[#828282] dark:text-[#B6C2CF]"
>
	<OptionsIcon />
	Show Menu
</button>

{#if isOpen}
	<aside
		transition:slide={{ delay: 150, duration: 150, easing: quintInOut, axis: 'x' }}
		id="default-sidebar"
		class="fixed top-[68px] right-0 z-40 w-[377px] h-screen transition-transform -translate-x-full sm:translate-x-0 dark:text-[#B6C2CF]"
		aria-label="Sidebar"
	>
		<div class="h-full px-[35px] py-4 overflow-y-auto bg-[white] dark:bg-[#282E33] shadow-xl">
			<header class="flex flex-row justify-between items-center">
				{#if isSubMenuOpen}
					<button on:click={back}><BackIcon /></button>
					<h3 class="text-[#333333] dark:text-[#B6C2CF] font-semibold text-base">
						{componentActive}
					</h3>
				{:else}
					<h3 class="text-[#333333] dark:text-[#B6C2CF] font-semibold text-base">Menu</h3>
				{/if}

				<button
					on:click={() => {
						isOpen = false;
						isSubMenuOpen = false;
					}}
				>
					<CloseIcon />
				</button>
			</header>
			<hr class="my-[10px]" />
			{#if !isSubMenuOpen}
				<ul class="text-[#172B4D] dark:text-[#B6C2CF]">
					<li
						on:click={() => showComponent('About this board')}
						class="flex items-center pl-4 gap-3 h-[35px] w-full rounded-[8px] transition-colors duration-150 hover:bg-[#f0f1f4] dark:hover:bg-[#323940] text-sm font-medium mb-2 cursor-pointer"
					>
						<InfoIcon />
						About this board
					</li>
					<li
						on:click={() => showComponent('Change background')}
						class="flex items-center pl-4 gap-3 h-[35px] w-full rounded-[8px] transition-colors duration-150 hover:bg-[#f0f1f4] dark:hover:bg-[#323940] text-sm font-medium mb-2 cursor-pointer"
					>
						<div
							class="h-[20px] w-[20px] rounded-[4px] bg-center object-cover"
							style="background-image: url({board.background});"
						></div>
						Change Background
					</li>
					<li
						class="flex items-center pl-4 gap-3 h-[35px] w-full rounded-[8px] transition-colors duration-150 hover:bg-[#f0f1f4] dark:hover:bg-[#323940] text-sm font-medium mb-2"
					>
						<ActivityIcon />
						Activity
					</li>
					<li
						on:click={() => showComponent('Delete')}
						class="flex items-center pl-4 gap-3 h-[35px] w-full rounded-[8px] transition-colors duration-150 hover:bg-[#f0f1f4] dark:hover:bg-[#323940] text-sm font-medium mb-2 cursor-pointer"
					>
						<TrashIcon />
						Delete board
					</li>
					<li
						class="flex items-center pl-4 gap-3 h-[35px] w-full rounded-[8px] transition-colors duration-150 hover:bg-[#f0f1f4] dark:hover:bg-[#323940] text-sm font-medium"
					>
						<NoteIcon />
						Archived items
					</li>
				</ul>
			{:else}
				<div class="mt-8">
					{#if componentActive === 'Change background'}
						<ChangeBackground on:changeBackground={() => dispatch('updateBackground')} />
					{:else if componentActive === 'About this board'}
						<AboutThisBoard {board} />
					{:else if componentActive === 'Activity'}{:else if componentActive === 'Delete'}
						<DeleteBoard boardName={board.title} />
					{/if}
				</div>
			{/if}
		</div>
	</aside>
{/if}
