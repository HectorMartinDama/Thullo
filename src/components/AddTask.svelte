<script lang="ts">
	import PlusIcon from './icons/PlusIcon.svelte';
	import { X } from 'lucide-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { replaceDashWithSpace } from '$lib/utils';

	let inputTitleDom: HTMLElement;
	let showForm: boolean = false;
	export let notAllowModify: boolean;
	export let listId: string;

	$: currentBoardId = $page.params.id;
	$: currentBoardName = $page.params.name;

	const submitCreateTask: SubmitFunction = ({ formData, cancel }) => {
		let id = crypto.randomUUID();
		formData.append('id', id);
		return async ({ result, formData }) => {
			const title = formData.get('title');
			if (result.type === 'success') {
				toast('Task created', {
					description: `Added to ${replaceDashWithSpace(currentBoardName)}`,
					action: {
						label: 'View',
						onClick: () => {
							goto(`/task/${currentBoardId}/${formData.get('id')}`);
						}
					},
					position: 'bottom-right',
					duration: 4000
				});
			}
		};
	};
</script>

{#if !notAllowModify}
	<button
		on:click={() => (showForm = true)}
		class="z-10 h-[35.5px] rounded-xl bg-[#F1F2F4] dark:bg-[#101204] dark:text-[#B6C2CF] transition-colors duration-150 hover:bg-[#d0d4db] dark:hover:bg-[#31393F] text-[13px] flex items-center font-medium pl-4 gap-4 text-[#202020]"
	>
		<PlusIcon className="w-4 h-4" />
		Add task
	</button>

	{#if showForm}
		<div
			class="z-20 bg-[white] dark:bg-[#2b2a33] w-[280px] h-[140px] py-2 rounded-xl flex items-center justify-center absolute top-0 left-0"
		>
			<form method="POST" action="?/createTask" class="px-[10px]" use:enhance={submitCreateTask}>
				<textarea
					autofocus
					required
					name="title"
					bind:this={inputTitleDom}
					placeholder="Enter a title for this task...."
					class="min-h-[74px] w-[256px] py-[8px] px-[12px] text-[13px] rounded-[5px] mb-[8px] resize-none"
				/>
				<input type="hidden" name="listId" value={listId} />
				<div class="flex items-center gap-[15px]">
					<button
						type="submit"
						class="h-[32px] text-[13px] font-medium text-white transition-colors duration-300 ease-in-out bg-[#0C66E4] hover:bg-[#0055CC] px-[12px] rounded-[5px]"
						>Add task</button
					>
					<button on:click={() => (showForm = false)}>
						<X class="h-5 w-5 stroke-1" />
					</button>
				</div>
			</form>
		</div>
	{/if}
{/if}
