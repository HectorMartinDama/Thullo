<script lang="ts">
	import PlusIcon from './icons/PlusIcon.svelte';

	let inputTitleDom: HTMLElement;
	let showForm: boolean = false;
	export let notAllowModify: boolean;
	export let listId: string;

	$: if (showForm && inputTitleDom) focusInputTitle();

	const focusInputTitle = () => {
		inputTitleDom.focus();
	};
</script>

{#if !notAllowModify}
	<button
		on:click={() => (showForm = true)}
		class="z-10 h-[38px] rounded-xl bg-[#F1F2F4] dark:bg-[#101204] dark:text-[#B6C2CF] transition-colors duration-150 hover:bg-[#d0d4db] dark:hover:bg-[#31393F] text-[#172B4D] text-[14px] flex items-center font-medium text-sm pl-4 gap-4"
	>
		<PlusIcon className="w-4 h-4" />
		Add task
	</button>

	{#if showForm}
		<div
			class="z-20 bg-[white] dark:bg-[#2b2a33] w-[280px] h-[140px] py-2 rounded-xl flex items-center justify-center absolute top-0 left-0"
		>
			<form method="POST" action="?/createTask" class="px-[10px]">
				<textarea
					required
					name="title"
					bind:this={inputTitleDom}
					placeholder="Enter a title for this task...."
					class="min-h-[74px] w-[256px] py-[8px] px-[12px] rounded-[5px] mb-[8px] resize-none"
				/>
				<input type="hidden" name="listId" value={listId} />
				<div class="flex items-center gap-[15px]">
					<button
						type="submit"
						class="h-[32px] text-sm font-medium text-white transition-colors duration-300 ease-in-out bg-[#0C66E4] hover:bg-[#0055CC] px-[12px] rounded-[5px]"
						>Add task</button
					>
					<button on:click={() => (showForm = false)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="icon icon-tabler icon-tabler-x"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path
								d="M6 6l12 12"
							/></svg
						>
					</button>
				</div>
			</form>
		</div>
	{/if}
{/if}
