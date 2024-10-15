<script lang="ts">
	import { getAllBoard } from '$lib/requestsBackend';
	import type { Board } from '$lib/types';
	import { onDestroy, onMount } from 'svelte';
	import PreviewBoard from '../components/PreviewBoard.svelte';
	import { page } from '$app/stores';
	import updateFavoriteBoard from '$lib/stores/updateFavoriteBoard';

	let sessionToken: string | undefined;
	export let boards: Board[];

	const updateBoards = async () => {
		boards = await getAllBoard(sessionToken);
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

<div class="grid grid-cols-4 gap-[16.5px] mb-10">
	{#each boards as board}
		<PreviewBoard {board} />
	{/each}
</div>
