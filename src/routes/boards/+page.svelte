<script lang="ts">
	import { page } from '$app/stores';
	import { getAllBoard } from '$lib/requestsBackend';
	import { onMount } from 'svelte';
	import PreviewBoard from '../../components/PreviewBoard.svelte';
	import BoardIcon from '../../components/icons/BoardIcon.svelte';
	import StarredIcon from '../../components/icons/StarredIcon.svelte';
	import CreateBoard from '../../components/CreateBoard.svelte';
	export let data;

	let sessionToken: string | undefined;
	let boards = data.boards;

	const updateBoards = async () => {
		console.log('hola me tengo que actializaå', boards);
		boards = await getAllBoard(sessionToken);
	};

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
	{#if boards && boards.map((board) => board.favourites
				?.map((user) => user.email)
				.includes($page.data.session?.user?.email))}
		<section class="mx-[180px] my-[50px]">
			<header
				class="w-full flex flex-row justify-between items-center my-[25px] text-[#44546F] dark:text-[#9FADBC]"
			>
				<h3 class="flex flex-row gap-5 font-bold text-[16px]">
					<StarredIcon />
					Starred boards
				</h3>
				<div>
					<CreateBoard />
				</div>
			</header>

			<div class="grid grid-cols-4 gap-[16.5px]">
				{#each boards as board}
					{#if board.favourites
						?.map((user) => user.email)
						.includes($page.data.session?.user?.email)}
						<PreviewBoard {board} on:removeToFavourite={updateBoards} />
					{/if}
				{/each}
			</div>
		</section>
	{/if}

	<section class="w-[825px] mx-[180px]">
		<header class="flex justify-between items-center my-[25px] text-[#44546F] dark:text-[#9FADBC]">
			<h3 class="flex flex-row gap-5 font-bold text-[16px]">
				<BoardIcon />
				Your boards
			</h3>
		</header>

		{#if boards}
			<div class="grid grid-cols-4 gap-[16.5px]">
				{#each boards as board}
					<PreviewBoard {board} on:addToFavourite={updateBoards} />
				{/each}
			</div>
		{/if}
	</section>
</main>

<style>
	main {
		height: calc(100vh - 68px);
	}
</style>
