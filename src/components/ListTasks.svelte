<script lang="ts">
	import type { List, TaskItem } from '$lib/types';
	import Task from './Task.svelte';
	import AddTask from './AddTask.svelte';
	import { createEventDispatcher } from 'svelte';

	import { flip } from 'svelte/animate';
	import DropDownMenuList from './DropDownMenuList.svelte';

	const dispacth = createEventDispatcher();

	export let list: List;
	let taskDragging: TaskItem;

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
</script>

<section>
	<div
		role="region"
		class="flex flex-col gap-[15px] max-h-[625px] h-[200px] mb-[30px] bg-[#F1F2F4] dark:bg-[#101204] rounded-xl"
		on:dragover={(e) => e.preventDefault()}
		on:drop={assignedTask}
	>
		<header class="h-[38px] flex justify-between px-[15px] py-[15px]">
			<h2 class="text-[14px] text-[#172B4D] dark:text-[#B6C2CF] font-semibold">{list.title}</h2>
			<DropDownMenuList {list} />
		</header>

		<!-- Tasks -->
		<div class="flex flex-col items-center pt-[30px]">
			<ul>
				{#if list.tasks}
					{#each list.tasks as task (task.id)}
						<!-- Whithout the (task.id) svelte can't identify each one differently -->
						<div role="region" id={task.id} on:drag={(e) => taskDraggingEvent(e, list.tasks)}>
							<Task {task} />
						</div>
					{/each}
				{/if}
			</ul>
		</div>
	</div>
	<AddTask listId={list.id} />
</section>

<style>
	.highlight {
		background-color: blue;
		border-color: blue;
		color: red;
	}
</style>
