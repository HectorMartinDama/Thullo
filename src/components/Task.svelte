<script lang="ts">
	import type { Board, TaskItem, User } from '$lib/types';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { page } from '$app/stores';
	import { addTaskDescription, getTaskById, renameTitleTask } from '$lib/requestsBackend';
	import { onMount } from 'svelte';
	import Label from './Label.svelte';
	import PriorityTaskLevel from './PriorityTaskLevel.svelte';
	import { Calendar } from 'lucide-svelte';
	import { differenceDays, formatDate, getDayMonth } from '$lib/utils';

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
	class="border rounded-xl px-3 py-2 max-w-[250px] w-[250px] z-20 transition-colors duration-150 hover:bg-[#EEEEEE]"
>
	<a
		class="w-full text-sm text-[#202020] dark:text-white leading-5"
		href="/task/{board.id}/{task.id}"
	>
		<div class="flex flex-col gap-2">
			<div class="flex flex-row items-center gap-2">
				<PriorityTaskLevel priority={task.priority} />
				<h1 class=" overflow-hidden font-medium truncate text-sm">{task.title}</h1>
			</div>
			<div class="flex flex-row flex-wrap w-full gap-3">
				<HoverCard.Root>
					<HoverCard.Trigger
						class="text-xs text-[#808080] flex flex-row gap-1 items-center justify-center"
					>
						<Calendar class="h-3 w-3 stroke-[#808080]" />
						{getDayMonth(task.createdAt)}
					</HoverCard.Trigger>
					<HoverCard.Content
						class="flex flex-col border-none text-white  w-[170px] text-xs bg-[#282828]"
					>
						{formatDate(task.createdAt)}
						<hr class="my-2" />
						<span class="text-xs">{differenceDays(task.createdAt)} days left</span>
					</HoverCard.Content>
				</HoverCard.Root>
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
