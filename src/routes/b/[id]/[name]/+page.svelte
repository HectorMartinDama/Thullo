<script lang="ts">
	import type { Board } from '$lib/types';

	// moock de datos. Se remplaza por consulta en la base de datos.
	import ListTasks from '../../../../components/ListTasks.svelte';
	import AddAnotherList from '../../../../components/AddAnotherList.svelte';
	import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { getBoardById, updateOrderList } from '$lib/requestsBackend';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import TypeBoardButton from '../../../../components/TypeBoardButton.svelte';
	import InviteBoard from '../../../../components/InviteBoard.svelte';
	import Navbar from '../../../../components/Navbar.svelte';
	import Sidebar from '../../../../components/Sidebar.svelte';
	import { cubicIn } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	const boardId = $page.params.id;
	const flipDurationMs = 200;

	export let data;
	let board: Board = data.board;
	let sessionToken: string | undefined;
	let notAllowModify: boolean;

	const hola = async () => {
		let response = await getBoardById(sessionToken, $page.params.id);
		board = response;
	};

	// comprueba si el tablero es suyo para poder editarlo
	$: if (
		$page.data.session?.user?.email === board.user.email ||
		board.members.map((member) => member.email).includes($page.data.session?.user?.email)
	) {
		notAllowModify = false;
	} else {
		notAllowModify = true;
	}

	const handleDndConsiderColumns = (e) => {
		board.lists = e.detail.items;
	};

	// se ejecuta cuando finalize el moviendo de las listas
	const handleDndFinalizeColumns = async (e) => {
		board.lists = e.detail.items;
		let listsId = board.lists?.map((list) => list.id);
		if (listsId) updateOrderList(sessionToken, boardId, listsId);
	};

	const getClasses = (item) => {
		console.log(item);
		return item[SHADOW_ITEM_MARKER_PROPERTY_NAME] ? 'dragging' : '';
	};

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});

	const updateBoard = async () => {
		board = await getBoardById(sessionToken, board.id);
	};
</script>

<svelte:head>
	<title>{data.pageTitle} | Thullo</title>
</svelte:head>

<Navbar boardTitle={board.title} />

{#if board.lists}
	<header
		class="flex justify-between h-[56px] bg-[white] dark:bg-[#1D2125] w-full items-center px-[25px] gap-4"
	>
		<div class="flex flex-row gap-4">
			<TypeBoardButton visibility={board.visibility} {board} on:changeVisibility={updateBoard} />
			{#if $page.data.session?.user?.email === board.user.email}
				<!-- Si es el creador, podra invitar a gente  -->
				<InviteBoard {board} />
			{/if}
		</div>
		<Sidebar {board} on:updateBackground={updateBoard} />
	</header>

	<!-- ADMIN BOARD -->

	<section
		use:dndzone={{
			items: board.lists,
			flipDurationMs,
			type: 'columns',
			dragDisabled: notAllowModify
		}}
		on:consider={handleDndConsiderColumns}
		on:finalize={handleDndFinalizeColumns}
		class="px-[25px] flex flex-row bg-center bg-no-repeat gap-[20px] pt-[50px] overflow-x-auto bg-[#f8f9fd]"
		id="board"
		style="background-image: url({board.background});"
	>
		{#each board.lists as list (list.id)}
			<div animate:flip={{ duration: flipDurationMs }} class="{getClasses(list)} relative h-min">
				<ListTasks {list} {notAllowModify} members={board.members} {board} />

				{#if list[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
					<div in:fade={{ duration: 200, easing: cubicIn }} class="custom-shadow-item"></div>
				{/if}
			</div>
		{/each}

		<AddAnotherList {notAllowModify} />
	</section>
{/if}

<style>
	section {
		height: calc(100vh - 48px); /* le quito el espacio que ocupa el navbar plus header */
		width: 100vw;
		background-size: cover;
		background-repeat: no-repeat;
	}

	#board {
		height: calc(100vh - 124px);
	}

	.custom-shadow-item {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		visibility: visible;
		background: #ffffff3d;
		border-radius: 8px;
		margin: 0;
	}
</style>
