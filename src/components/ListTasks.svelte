<script lang="ts">
	import Task from './Task.svelte';
	import AddTask from './AddTask.svelte';
	import { createEventDispatcher } from 'svelte';

	import { flip } from 'svelte/animate';
	import DropDownMenuList from './DropDownMenuList.svelte';
	import { dndzone, type DndEvent } from 'svelte-dnd-action';
	import type { List, TaskItem } from '$lib/types';

	const dispacth = createEventDispatcher();

	export let list: List;
	let taskDragging: TaskItem;
	const flipDurationMs = 300;
	let tasks = list.tasks;

	// when move the task
	const taskDraggingEvent = (e: DragEvent, tasks: TaskItem[]) => {
		const id = (e.target as HTMLElement).getAttribute('id');
		const task = tasks.find((task) => task.id === id);
		console.log('estoy moviendo la task', id);

		//document.getElementById(id)?.remove();

		dispacth('taskDragging', task);
	};

	// cada vez que muevo una task la asigno a la variable
	function todoDragging(e: DragEvent, tasks: TaskItem[]) {
		const id = (e.target as HTMLElement).getAttribute('id');
		const task = tasks.find((task) => task.id === id);
		if (task) taskDragging = task;
	}

	// when drop de task in the list
	function assignedTask() {
		dispacth('assignedTask', list.title);
	}

	function handleDndConsider(e) {
		console.log(e.detail.items);
	}
	function handleDndFinalize(e) {
		console.log(e.detail.items);
	}

	function handleDndConsiderCards(e) {
		list.tasks = e.detail.items;
	}

	function handleDndFinalizeCards(cid, e) {
		//const colIdx = columnItems.findIndex((c) => c.id === cid);
		//columnItems[colIdx].items = e.detail.items;
		//columnItems = [...columnItems];
		console.log('end move', cid, e.detail.items);
	}
</script>

<section
	class="flex flex-col px-[15px] py-[15px] gap-[15px] max-h-[580px] w-[280px] max-w-[280px] bg-[#F1F2F4] dark:bg-[#101204] rounded-xl"
>
	<header class="h-[38px] flex justify-between">
		<h2 class="text-[14px] text-[#172B4D] dark:text-[#B6C2CF] font-semibold">{list.title}</h2>
		<DropDownMenuList {list} />
	</header>

	<div
		class="flex flex-col justify-center items-center gap-3 overflow-y"
		use:dndzone={{ items: list.tasks, flipDurationMs }}
		on:consider={(e) => handleDndConsiderCards(e)}
		on:finalize={(e) => handleDndFinalizeCards(e)}
	>
		{#each list.tasks as task (task.id)}
			<div animate:flip={{ duration: 300 }}>
				<Task {task} />
			</div>
		{/each}
	</div>
</section>
<AddTask listId={list.id} />
