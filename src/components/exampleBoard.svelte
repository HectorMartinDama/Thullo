<script lang="ts">
	import { exampleBoard } from '$lib';
	import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import { cubicIn } from 'svelte/easing';
	import OptionsIcon from './icons/OptionsIcon.svelte';
	import { onMount } from 'svelte';

	let board = exampleBoard;

	const handleDndConsiderColumns = (e) => {
		board = e.detail.items;
	};

	// se ejecuta cuando finalize el moviendo de las listas
	const handleDndFinalizeColumns = async (e) => {
		board = e.detail.items;
	};

	function handleDndConsiderCards(cid, e) {
		const colIdx = board.findIndex((c) => c.id === cid);
		board[colIdx].items = e.detail.items;
		board = [...board];
	}

	function handleDndFinalizeCards(cid, e) {
		const colIdx = board.findIndex((c) => c.id === cid);
		board[colIdx].items = e.detail.items;
		board = [...board];
	}

	onMount(() => {
		if (window.innerWidth <= 768) {
			board = board.slice(1, 3);
		}
	});
</script>

<div
	class="flex flex-row gap-4 text-[#1C1E21]"
	use:dndzone={{ items: board, flipDurationMs: 200, type: 'columns' }}
	on:consider={handleDndConsiderColumns}
	on:finalize={handleDndFinalizeColumns}
>
	{#each board as column (column.id)}
		<div
			animate:flip={{ duration: 200 }}
			class="w-[200px] h-[260px] bg-[white] dark:bg-[#1a1a1a] rounded-[8px] text-sm font-normal px-4 py-4 relative"
		>
			<div>
				<header class=" h-9 flex justify-between">
					<h3 class="text-sm font-semibold text-black dark:text-[#bfbfbf]">{column.name}</h3>
					<OptionsIcon />
				</header>

				<div
					use:dndzone={{ items: column.items, flipDurationMs: 200 }}
					on:consider={(e) => handleDndConsiderCards(column.id, e)}
					on:finalize={(e) => handleDndFinalizeCards(column.id, e)}
				>
					{#each column.items as item (item.id)}
						<div
							class="flex items-center px-2 py-2 rounded-[8px] bg-white border-2 hover:bg-[#E7E7F5] mb-3"
							animate:flip={{ duration: 200 }}
						>
							{item.name}
						</div>
					{/each}
				</div>
			</div>
			{#if column[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
				<div in:fade={{ duration: 200, easing: cubicIn }} class="custom-shadow-item"></div>
			{/if}
		</div>
	{/each}
</div>

<style lang="css">
	.custom-shadow-item {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		visibility: visible;
		background: #f1edff;
		border-radius: 8px;
		margin: 0;
	}
</style>
