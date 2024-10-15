<script lang="ts">
	import type { Board } from '$lib/types';
	import { onDestroy, onMount } from 'svelte';
	import BoardIcon from './icons/BoardIcon.svelte';
	import StarredIcon from './icons/StarredIcon.svelte';
	import PreviewBoard from './PreviewBoard.svelte';
	import { page } from '$app/stores';
	import { getAllBoard } from '$lib/requestsBackend';
	import updateFavoriteBoard from '$lib/stores/updateFavoriteBoard';

	export let boards: Board[];
	let sessionToken: string | undefined;
	let favorites = boards.filter((board) => board.favourites && board.favourites?.length > 0);

	const updateBoards = async () => {
		console.log('updateBoards');
		boards = await getAllBoard(sessionToken);
		favorites = boards.filter((board) => board.favourites && board.favourites?.length > 0);
	};

	const unsubscribe = updateFavoriteBoard.subscribe((value) => {
		if (value) updateBoards();
		updateFavoriteBoard.set(false);
	});

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

{#if favorites.length > 0}
	<div>
		<header class="flex justify-between items-center my-[25px] text-[#44546F] dark:text-[#9FADBC]">
			<h3 class="flex flex-row gap-5 font-bold text-[16px]">
				<StarredIcon className={'h-6 w-6'} />
				Favorites
			</h3>
		</header>
		<div class="grid grid-cols-4 gap-[16.5px]">
			{#each favorites as board}
				<PreviewBoard
					{board}
					on:addToFavourite={updateBoards}
					on:removeToFavourite={updateBoards}
				/>
			{/each}
		</div>
	</div>
{/if}
