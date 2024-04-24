<script lang="ts">
	import Task from './Task.svelte';
	import AddTask from './AddTask.svelte';
	import { onMount } from 'svelte';

	import { flip } from 'svelte/animate';
	import DropDownMenuList from './DropDownMenuList.svelte';
	import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
	import type { Board, List, User } from '$lib/types';
	import { updatePositionTask } from '$lib/requestsBackend';
	import { page } from '$app/stores';
	import AllBoardButton from './AllBoardButton.svelte';
	import { fade } from 'svelte/transition';
	import { cubicIn } from 'svelte/easing';

	export let notAllowModify: boolean;
	export let list: List;
	export let members: User[] | undefined;
	export let board: Board;
	const flipDurationMs = 300;
	let sessionToken: string | undefined;

	function handleDndConsiderCards(e) {
		list.tasks = e.detail.items;
	}

	function handleDndFinalizeCards(listId: string, e) {
		//TODO Necesito saber cual el la task que estoy moviendo

		let tasksId = list.tasks.map((task) => task.id);
		// lista destino
		if (e.detail.items.filter((task) => !list.tasks.includes(task)).length > 0) {
			const taskMove = e.detail.items.filter((task) => !list.tasks.includes(task));
			updatePositionTask(sessionToken, listId, taskMove[0].id, tasksId);
		}
	}

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});
</script>

<section
	class="flex flex-col px-[15px] py-[15px] gap-[15px] max-h-[580px] w-[280px] max-w-[280px] bg-[#F1F2F4] dark:bg-[#101204] rounded-xl"
>
	<header class="h-[38px] flex justify-between">
		<h2 class="text-[14px] text-[#172B4D] dark:text-[#B6C2CF] font-semibold">{list.title}</h2>
		{#if !notAllowModify}
			<DropDownMenuList {list} />
		{/if}
	</header>

	<div
		class="flex flex-col items-center gap-3 overflow-auto overflow-y-auto max-h-[500px] w-full"
		use:dndzone={{ items: list.tasks, flipDurationMs, dragDisabled: notAllowModify }}
		on:consider={(e) => handleDndConsiderCards(e)}
		on:finalize={(e) => handleDndFinalizeCards(list.id, e)}
	>
		{#each list.tasks as task (task.id)}
			<div animate:flip={{ duration: 300 }} class="relative">
				<Task {task} {members} {board} />
				{#if task[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
					<Task {task} {members} {board} />
				{/if}
			</div>
		{/each}
	</div>
	<AddTask listId={list.id} {notAllowModify} />
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
