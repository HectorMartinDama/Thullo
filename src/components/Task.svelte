<script lang="ts">
	import type { Board, TaskItem, User } from '$lib/types';
	import { page } from '$app/stores';
	import { addTaskDescription, getTaskById, renameTitleTask } from '$lib/requestsBackend';
	import { onMount } from 'svelte';
	import Label from './Label.svelte';
	import PriorityTaskLevel from './PriorityTaskLevel.svelte';
	import DueDate from './DueDate.svelte';
	import { addScript } from '$lib';

	let sessionToken: string | undefined;
	export let task: TaskItem;
	export let members: User[] | undefined;
	export let board: Board;
	let newTitleValue = task.title;
	let description = task.description || '';

	const refresh = async () => {
		task = await getTaskById(sessionToken, task.id);
	};

	const handleKeyPress = async (event: KeyboardEvent) => {
		if (
			event.key === 'Enter' &&
			newTitleValue.trim() != task.title.trim() &&
			newTitleValue.trim().length > 0
		) {
			await renameTitleTask(sessionToken, task.id, newTitleValue.trim());
		}
	};

	const saveDescription = async () => {
		await addTaskDescription(sessionToken, task.id, description);
	};

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});
</script>

<div
	draggable="true"
	class="border rounded-xl px-3 py-2 max-w-[250px] w-[250px] z-20 transition-colors duration-150 dark:hover:bg-[#2a3034] hover:bg-[#EEEEEE]"
>
	<a
		class="w-full text-sm text-[#202020] dark:text-white leading-5"
		href="/b/{board.id}/{addScript(board.title)}/{task.id}"
	>
		<div class="flex flex-col gap-2">
			<div class="flex flex-row items-center gap-2">
				<PriorityTaskLevel priority={task.priority} />
				<h1 class=" overflow-hidden font-medium truncate text-[13px]">{task.title}</h1>
			</div>
			<div class="flex flex-row flex-wrap w-full gap-3">
				{#if task.dueDate}
					<DueDate date={task.dueDate} />
				{/if}

				<!-- Labels -->
				{#if task.labels}
					<div class="flex flex-wrap gap-3">
						{#each task.labels as label}
							<Label {label} />
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</a>
</div>
