<script lang="ts">
	import type { Board } from '$lib/types';
	import { list } from 'postcss';
	import Navbar from '../../../../components/Navbar.svelte';
	import TypeBoardButton from '../../../../components/TypeBoardButton.svelte';
	import { page } from '$app/stores';
	import InviteBoard from '../../../../components/InviteBoard.svelte';
	import MembersGroupAvatar from '../../../../components/MembersGroupAvatar.svelte';
	import Sidebar from '../../../../components/Sidebar.svelte';
	import { getBoardById, updateOrderList } from '$lib/requestsBackend';
	import { onMount } from 'svelte';
	import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
	import AddAnotherList from '../../../../components/AddAnotherList.svelte';
	import ListTasks from '../../../../components/ListTasks.svelte';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	export let data;
	const boardId = $page.params.id;
	let sessionToken: string | undefined;
	let notAllowModify: boolean;
	let board: Board = data.board;
	const flipDurationMs = 200;

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
		EndContainer();
	};

	const EndContainer = () => {
		const container = document.getElementById('board');
		if (container) container.scrollLeft = container.scrollWidth;
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
			<TypeBoardButton {board} on:changeVisibility={updateBoard} />
			{#if $page.data.session?.user?.email === board.user.email}
				<!-- Si es el creador, podra invitar a gente  -->
				<InviteBoard {board} />
			{/if}
		</div>
		<div class="flex flex-row gap-8">
			<MembersGroupAvatar members={board.members} admin={board.user} />
			<Sidebar {board} on:updateBackground={updateBoard} />
		</div>
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
		class="px-[25px] flex flex-row bg-center bg-no-repeat gap-[20px] pt-[50px] overflow-x-auto"
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
		<AddAnotherList {notAllowModify} on:successAddList={updateBoard} />
		<slot />
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
		transition: background-image 0.5s ease;
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
