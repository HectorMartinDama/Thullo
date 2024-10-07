<script lang="ts">
	import { page } from '$app/stores';
	import type { Board } from '$lib/types';
	import Button from '$lib/components/ui/button/button.svelte';

	import { CircleUser, StickyNoteIcon, Users } from 'lucide-svelte';
	import TeamCard from './TeamCard.svelte';
	import { getBoardById } from '$lib/requestsBackend';
	export let board: Board;
	let currentInputDescriptionValue: string = board.title;
	let taskEditorDescription: HTMLDivElement;
	let taskEditor = false;
	let descriptionValue: string;

	const focusEndOfDiv = (element: HTMLDivElement) => {
		element.focus();
		let range = document.createRange();
		let selection = window.getSelection();
		range.selectNodeContents(element);
		range.collapse(false);
		if (selection) {
			selection.removeAllRanges();
			selection.addRange(range);
		}
	};

	const changeBoardDescription = async () => {};

	const handleTaskDescription = (event) => {
		currentInputDescriptionValue = event.target.innerText;
	};

	const cancelOperation = () => {
		taskEditor = false;
	};

	const editBoardDescription = () => {
		taskEditor = true;
		setTimeout(() => {
			if (taskEditorDescription) focusEndOfDiv(taskEditorDescription);
		}, 0);
	};
</script>

{#if board}
	<ul class="space-y-2 font-medium">
		<li
			class="flex flex-row items-center gap-1 py-[10px] text-[13px] text-[#202020] dark:text-white font-medium"
		>
			<CircleUser class="mr-2 h-4 w-4" />
			<span>Made by</span>
		</li>
		<li class="flex flex-row gap-4 items-center pb-3">
			{#if board.user}
				<TeamCard
					name={board.user.name}
					image={board.user.image}
					description={board.user.email}
					role="Admin"
				/>
			{/if}
		</li>
		<li
			class="flex flex-row items-center font-medium gap-1 py-[10px] text-[13px] text-[#202020] dark:text-white"
		>
			<StickyNoteIcon class="mr-2 h-4 w-4" />
			<span>Description</span>
		</li>

		<div>
			{#if !taskEditor}
				<button
					on:click={editBoardDescription}
					class="font-normal text-sm text-[#999999] dark:text-gray-400"
				>
					{#if board.description}
						{board.description}
					{:else}
						Add the description of the board...
					{/if}
				</button>
			{:else}
				<form action="">
					<div class="border border-[#e6e6e6] rounded-[10px] min-h-[115px] px-2 py-2 mb-2">
						<div
							class="font-normal text-sm text-[#999999] dark:text-gray-400 outline-none"
							bind:this={taskEditorDescription}
							on:input={handleTaskDescription}
							contenteditable="true"
							aria-label="board description"
						>
							{board.description}
						</div>
					</div>
					<div class="flex justify-start gap-4">
						<Button variant="outline" class="h-8 text-xs bg-[#f5f5f5]" on:click={cancelOperation}
							>Discard</Button
						>
						<Button
							variant="destructive"
							class="bg-[#c3392c] h-8 text-xs"
							disabled={!currentInputDescriptionValue}
							on:click={changeBoardDescription}>Save</Button
						>
					</div>
				</form>
			{/if}
		</div>

		<li
			class="flex flex-row items-center font-medium gap-1 text-[13px] py-[10px] text-[#202020] dark:text-white"
		>
			<Users class="mr-2 h-4 w-4" />
			<span>Team</span>
		</li>

		<div class="h-50 w-full">
			<div class=" gap-4">
				{#if board.user}
					<TeamCard
						name={board.user?.name}
						image={board.user?.image}
						description={board.user.email}
						role="Admin"
					/>
				{/if}
				{#if board.members}
					{#each board.members as member}
						<TeamCard
							name={member.name}
							image={member.image}
							description={member.email}
							role="Member"
						/>
					{/each}
				{/if}
			</div>
		</div>

		<!-- {#if $page.data.session?.user?.email === board.user.email}

							<button
								class="h-[24px] px-3 rounded-[8px] text-[#EB5757] font-normal border border-[#EB5757] text-xs transition-colors duration-150 hover:bg-[#FFEDEF]"
								>Remove</button
							>
						{/if} -->
	</ul>
{/if}
