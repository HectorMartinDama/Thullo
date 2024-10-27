<script lang="ts">
	import Task from './Task.svelte';
	import AddTask from './AddTask.svelte';
	import { onMount } from 'svelte';

	import { flip } from 'svelte/animate';
	import DropDownMenuList from './DropDownMenuList.svelte';
	import { dndzone } from 'svelte-dnd-action';
	import type { Board, List, User } from '$lib/types';
	import { getListById, renameTitleList, updatePositionTask } from '$lib/requestsBackend';
	import { page } from '$app/stores';

	export let notAllowModify: boolean;
	export let list: List;
	export let members: User[] | undefined;
	export let board: Board;
	let listEditorTitleInput: HTMLInputElement;
	const flipDurationMs = 300;
	let sessionToken: string | undefined;
	let newTitleValue = list.title;
	let inputRename = false;

	const updateList = async () => {
		list = await getListById(sessionToken, list.id);
	};

	function handleDndConsiderCards(e) {
		list.tasks = e.detail.items;
	}

	function handleDndFinalizeCards(listId: string, e) {
		//TODO Necesito saber cual el la task que estoy moviendo

		let tasksId = list.tasks.map((task) => task.id);
		// lista destino
		if (e.detail.items.filter((task) => !list.tasks.includes(task)).length > 0) {
			const taskMove = e.detail.items.filter((task) => !list.tasks.includes(task));
			console.log('moviendo la lista');
			updatePositionTask(sessionToken, listId, taskMove[0].id, tasksId);
		}
	}

	const handleKeyPress = async (event: KeyboardEvent) => {
		if (
			event.key === 'Enter' &&
			newTitleValue.trim() != list.title.trim() &&
			newTitleValue.trim().length > 0
		) {
			await renameTitleList(sessionToken, list.id, newTitleValue.trim());
		}
	};

	const focusListEditorTitleInput = () => {
		inputRename = true;
		setTimeout(() => {
			if (listEditorTitleInput) listEditorTitleInput.focus();
		}, 30);
	};

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});
</script>

<section
	class="flex flex-col px-[15px] py-[15px] gap-[15px] max-h-[580px] w-[280px] bg-white dark:bg-[#101204] rounded-xl"
>
	<header class="h-[38px] flex items-center justify-between">
		{#if !inputRename}
			<div
				class="cursor-pointer h-[20px] px-2 py-2 rounded-[4px] transition-colors duration-150 ease-in-out hover:bg-gray-300 flex items-center"
				on:click={() => {
					focusListEditorTitleInput();
				}}
			>
				<h2 class="text-[14px] text-[#172B4D] dark:text-[#B6C2CF] font-semibold">{list.title}</h2>
			</div>
		{:else}
			<input
				bind:this={listEditorTitleInput}
				type="text"
				on:keypress={handleKeyPress}
				bind:value={newTitleValue}
				class="text-[14px] text-[#172B4D] dark:text-[#B6C2CF] font-semibold justify-center h-[20px] px-2 py-3 rounded-lg"
			/>
		{/if}
		{#if !notAllowModify}
			<DropDownMenuList {list} on:editListTitle={focusListEditorTitleInput} />
		{/if}
	</header>

	{#if list.tasks}
		<div
			class="flex flex-col items-center gap-3 overflow-auto overflow-y-auto min-h-[60px] max-h-[500px] w-full h-full"
			use:dndzone={{ items: list.tasks, flipDurationMs, dragDisabled: notAllowModify }}
			on:consider={(e) => handleDndConsiderCards(e)}
			on:finalize={(e) => handleDndFinalizeCards(list.id, e)}
		>
			{#each list.tasks as task (task.id)}
				<div animate:flip={{ duration: 300 }} class="relative">
					<Task {task} {members} {board} />
				</div>
			{/each}
		</div>
		<AddTask listId={list.id} {notAllowModify} on:createTask={updateList} />
	{/if}
</section>

<style>
	.custom-shadow-item {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		visibility: visible;
		border: 1px dashed grey;
		background: lightblue;

		margin: 0;
	}
</style>
