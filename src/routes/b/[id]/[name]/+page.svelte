<script lang="ts">
	import type { TaskItem, Board } from '$lib/types';

	// moock de datos. Se remplaza por consulta en la base de datos.
	import ListTasks from '../../../../components/ListTasks.svelte';
	import AddAnotherList from '../../../../components/AddAnotherList.svelte';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { list } from 'postcss';
	import Task from '../../../../components/Task.svelte';
	import { updateOrderList } from '$lib/requestsBackend';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	const boardId = $page.params.id;

	const background = '/background-crystallBall.svg';
	const flipDurationMs = 200;

	let taskDragging: TaskItem;
	export let data;
	const board: Board = data.board;
	let sessionToken: string | undefined;

	const prueba = (listId: string) => {
		console.log(`se ha dropeado la task ${taskDragging.title} en la list ${listId}`);
	};

	const handleDndConsiderColumns = (e) => {
		board.lists = e.detail.items;
	};

	// se ejecuta cuando finalize el moviendo de las listas
	const handleDndFinalizeColumns = async (e) => {
		board.lists = e.detail.items;
		let listsId = board.lists?.map((list) => list.id);
		if (listsId) updateOrderList(sessionToken, boardId, listsId);
	};

	function handleDndConsiderCards(cid, e) {
		const colIdx = columnItems.findIndex((c) => c.id === cid);
		columnItems[colIdx].items = e.detail.items;
		columnItems = [...columnItems];
	}
	function handleDndFinalizeCards(cid, e) {
		const colIdx = columnItems.findIndex((c) => c.id === cid);
		columnItems[colIdx].items = e.detail.items;
		columnItems = [...columnItems];
	}

	console.log(board);

	// header dark #0000003d

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});
</script>

<svelte:head>
	<title>{data.pageTitle} | Thullo</title>
</svelte:head>

{#if board.lists}
	<section
		use:dndzone={{ items: board.lists, flipDurationMs, type: 'columns' }}
		on:consider={handleDndConsiderColumns}
		on:finalize={handleDndFinalizeColumns}
		class="px-[16px] flex flex-row bg-center bg-no-repeat gap-[20px] pt-[50px]"
		style="background-image: url({board.background});"
	>
		{#each board.lists as list (list.id)}
			<div id="colum" animate:flip={{ duration: flipDurationMs }} class="overflow-y-hidden">
				<ListTasks {list} />
				<!-- <div id="list-header">{list.title}</div> -->
				<!-- <div id="list-content" use:dndzone={{ items: list.tasks, flipDurationMs }}>
					{#each list.tasks as task (task.id)}
						<div animate:flip={{ duration: flipDurationMs }}>
							<Task {task} />
						</div>
					{/each}
				</div> -->
			</div>
		{/each}

		<!-- <header class="fixed h-[56px] w-full flex items-center">
                    <h2 class="font-bold text-[18px] text-[#FFFFFF]">{board.title}</h2>
                    <TypeBoardButton visibility={board.visibility}/>
                </header> -->

		<AddAnotherList />
	</section>
{/if}

<style>
	section {
		height: calc(100vh - 48px); /* le quito el espacio que ocupa el navbarx */
		width: 100vw;
		background-size: cover;
		background-repeat: no-repeat;
	}
</style>
