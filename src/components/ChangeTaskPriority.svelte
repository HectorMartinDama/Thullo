<script lang="ts">
	import { page } from '$app/stores';
	import * as Select from '$lib/components/ui/select/index';
	import { changePriorityTask } from '$lib/requestsBackend';
	import type { Priority } from '$lib/types';
	import { createEventDispatcher, onMount } from 'svelte';

	export let taskId: string;
	let sessionToken: string | undefined;
	export let priority: Priority;

	const dispatch = createEventDispatcher();

	let selected = { value: priority.toString(), label: `Priority ${priority}` };

	const priorities = [
		{ value: '1', label: 'Priority 1' },
		{ value: '2', label: 'Priority 2' },
		{ value: '3', label: 'Priority 3' },
		{ value: '4', label: 'Priority 4' }
	];

	const changePriority = async (priority: number | undefined) => {
		if (priority === undefined) return;
		changePriorityTask(sessionToken, taskId, priority);
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
	<p class="text-[13px] font-semibold text-[#666]">Priority</p>

	<Select.Root
		portal={null}
		bind:selected
		onSelectedChange={(v) => {
			Number(v?.value) != priority && changePriority(Number(v?.value));
		}}
	>
		<Select.Trigger class="w-full h-[36px] hover:bg-[#f5f5f5] transition-colors duration-150">
			<Select.Value class="text-xs font-normal" />
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each priorities as priority}
					<Select.Item value={priority.value} label={priority.label}>{priority.label}</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
		<Select.Input name="favoriteFruit" />
	</Select.Root>
</div>
