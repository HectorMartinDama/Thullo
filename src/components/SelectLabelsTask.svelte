<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import { addLabelTask } from '$lib/requestsBackend';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import PlusIcon from './icons/PlusIcon.svelte';
	import { Input } from '$lib/components/ui/input';
	import type { TaskItem } from '$lib/types';

	export let task: TaskItem;
	let sessionToken: string | undefined;
	let labelTitle: string = '';

	const dispatch = createEventDispatcher();

	const isTheOwner: boolean = $page.data.session?.user?.email === task.user.email;

	const selectLabel = async () => {
		await addLabelTask(sessionToken, task.id, labelTitle);
		dispatch('addTask');
	};

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});
</script>

<Popover.Root portal={null}>
	<Popover.Trigger asChild let:builder>
		<Button
			disabled={!isTheOwner}
			variant="ghost"
			builders={[builder]}
			class="w-full justify-between h-[36px]"
		>
			<span class="text-xs font-semibold text-[#666]">Labels</span>
			<PlusIcon className="h-4 w-4 stroke-1" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[250px] rounded-xl" side="right" align="start">
		<div class="grid gap-4">
			<div class="grid gap-2">
				<Input
					type="text"
					bind:value={labelTitle}
					placeholder="Add label"
					class="w-full h-[32px] text-xs outline-none rounded-[8px] text-[#202020] border border-[#E0E0E0] pl-[10px] "
				/>
				<hr class="my-1" />
				<Button
					type="submit"
					variant="outline"
					class="h-8 text-xs"
					disabled={labelTitle === ''}
					on:click={() => {
						selectLabel();
					}}>Add</Button
				>
			</div>
		</div>
	</Popover.Content>
</Popover.Root>

<style>
	:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
