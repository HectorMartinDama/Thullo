<script lang="ts">
	import { page } from '$app/stores';
	import { getAllBoard } from '$lib/requestsBackend';
	import { onMount } from 'svelte';
	import BoardIcon from '../../components/icons/BoardIcon.svelte';
	import StarredIcon from '../../components/icons/StarredIcon.svelte';
	import CreateBoard from '../../components/CreateBoard.svelte';
	import GridBoards from '../../sections/GridBoards.svelte';
	export let data;

	let sessionToken: string | undefined;
	let boards = data.boards;
	let favorites = boards.filter((board) => board.favourites && board.favourites?.length > 0);

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});
</script>

<svelte:head>
	<title>Boards | Thullo</title>
</svelte:head>

<main class="flex flex-col justify-center">
	<section class="w-[825px] mx-[180px]">
		<header class="flex justify-between items-center my-[25px] text-[#44546F] dark:text-[#9FADBC]">
			<h3 class="flex flex-row gap-5 font-bold text-[16px]">
				<BoardIcon />
				Your boards
			</h3>
			<div>
				<CreateBoard />
			</div>
		</header>
		{#if boards}
			<GridBoards {boards} />
		{/if}
	</section>

	{#if favorites.length > 0}
		<section class="w-[825px] mx-[180px]">
			<header
				class="flex justify-between items-center my-[25px] text-[#44546F] dark:text-[#9FADBC]"
			>
				<h3 class="flex flex-row gap-5 font-bold text-[16px]">
					<StarredIcon />
					Favorites
				</h3>
			</header>
			<GridBoards {boards} />
		</section>
	{/if}
</main>

<style>
	main {
		height: calc(100vh - 68px);
	}
</style>
