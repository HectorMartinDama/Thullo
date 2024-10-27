<script lang="ts">
	import { page } from '$app/stores';
	import * as Select from '$lib/components/ui/select/index';
	import { changePriorityTask } from '$lib/requestsBackend';
	import type { Priority, TaskItem } from '$lib/types';
	import { createEventDispatcher, onMount } from 'svelte';

	export let task: TaskItem;
	let sessionToken: string | undefined;
	export let priority: Priority;

	const dispatch = createEventDispatcher();

	const isTheOwner: boolean = $page.data.session?.user?.email === task.user.email;

	let selected = { value: priority.toString(), label: `Priority ${priority}` };

	const priorities = [
		{ value: '1', label: 'Priority 1' },
		{ value: '2', label: 'Priority 2' },
		{ value: '3', label: 'Priority 3' },
		{ value: '4', label: 'Priority 4' }
	];

	const changePriority = async (priority: number | undefined) => {
		if (priority === undefined) return;
		await changePriorityTask(sessionToken, $page.params.id, task.id, priority);
		dispatch('changePriority');
	};

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});
</script>

<div class="flex flex-col gap-2">
	<p class="text-xs font-semibold text-[#666]">Priority</p>

	<Select.Root
		disabled={!isTheOwner}
		portal={null}
		bind:selected
		onSelectedChange={(v) => {
			Number(v?.value) != priority && changePriority(Number(v?.value));
		}}
	>
		<Select.Trigger
			class="w-full h-[36px] bg-[#fcfaf8] border-none hover:bg-[#f5f5f5] transition-colors duration-150"
		>
			<Select.Value class="text-xs font-normal text-[#202020]" />
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each priorities as priority}
					<Select.Item
						class="text-[13px] text-[#202020]"
						value={priority.value}
						label={priority.label}>{priority.label}</Select.Item
					>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
</div>
