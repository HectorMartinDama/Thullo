<script lang="ts">
	import type { Board, TaskItem, User } from '$lib/types';
	import CloseIcon from './icons/CloseIcon.svelte';
	import EditIcon from './icons/EditIcon.svelte';
	import NoteIcon from './icons/NoteIcon.svelte';
	import Attachment from './Attachment.svelte';
	import { page } from '$app/stores';
	import SelectTaskCover from './SelectTaskCover.svelte';
	import SelectLabelsTask from './SelectLabelsTask.svelte';
	import SelectMembersTask from './SelectMembersTask.svelte';
	import Label from './Label.svelte';
	import { addTaskDescription, getTaskById, renameTitleTask } from '$lib/requestsBackend';
	import { onMount } from 'svelte';
	import AddAttachments from './AddAttachments.svelte';

	let dialog: HTMLDialogElement | null;
	let sessionToken: string | undefined;
	export let task: TaskItem;
	export let members: User[] | undefined;
	export let board: Board;
	let inputRename = false;
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
	role="region"
	draggable="true"
	id={task.id}
	on:click={() => {
		dialog?.showModal();
	}}
	class=" bg-[white] dark:bg-[#22272B] text-[14px] dark:text-[#B6C2CF] max-w-[250px] w-[250px] px-[10px] py-[10px] rounded-xl border-2 dark:border-[#22272B] hover:border-[#0055CC] cursor-pointer"
>
	<!-- Cover  -->
	{#if task.cover}
		<div class="flex justify-center mb-[10px]">
			<img
				src={task.cover}
				alt="cover of task {task.id}"
				class="w-full h-[130px] object-cover flex justify-center rounded-[12px]"
			/>
		</div>
	{/if}
	<!-- Content  -->
	<h1 class="text-sm font-normal">{task.title}</h1>

	<!-- Labels -->
	{#if task.labels}
		<div class="grid grid-cols-3 gap-[10px] mt-[10px]">
			{#each task.labels as label}
				<Label {label} />
			{/each}
		</div>
	{/if}
</div>

<dialog
	bind:this={dialog}
	class="w-[660px] h-[1000px] rounded-[8px] px-[25px] py-[25px] cursor-default dark:bg-[#282e33] dark:text-[#B6C2CF]"
>
	<header class="flex justify-end">
		<button on:click={() => dialog?.close()}>
			<CloseIcon />
		</button>
	</header>

	<!-- COVER -->
	<div
		class="w-full h-[130px] rounded-[12px] flex justify-center items-center bg-center bg-cover"
		style={task.cover ? `background-image: url(${task.cover});` : 'background-color: #E0E0E0'}
	></div>

	<section class="flex flex-row">
		<!-- Content 1  -->
		<div>
			{#if !inputRename}
				<div
					on:click={() => (inputRename = true)}
					class="max-w-[400px] mt-[20px] mb-[35px] cursor-pointer rounded-[4px] h-[35px] pl-2 transition-colors duration-150 ease-in-out hover:bg-gray-300 flex items-center"
				>
					<h1 class="text-xl font-semibold">{task.title}</h1>
				</div>
			{:else}
				<input
					type="text"
					on:keypress={handleKeyPress}
					bind:value={newTitleValue}
					class="max-w-[400px] text-xl font-semibold h-[35px] mt-[20px] mb-[35px] pl-2"
				/>
			{/if}
			<section class="flex flex-row gap-[40px] mb-[15px]">
				<div class="flex gap-[7px]">
					<NoteIcon />
					<p class="text-[#BDBDBD] font-semibold">Description</p>
				</div>
			</section>

			<section class="w-[400px] mb-5">
				<textarea
					on:keyup={() => saveDescription()}
					bind:value={description}
					name="description"
					id="description"
					class="max-h-[220px] min-h-[220px] w-full resize-none rounded-[8px] px-[15px] py-[15px] outline-none border"
					placeholder="Add description"
				></textarea>
			</section>

			<section class="flex flex-row gap-[40px] mb-5">
				<div class="flex gap-[7px]">
					<NoteIcon />
					<p class="text-[#BDBDBD] font-semibold">Attachments</p>
				</div>
				<AddAttachments taskId={task.id} on:addedAttachment={refresh} />
			</section>

			{#if task.attachments}
				<div class="overflow-auto h-[170px]">
					{#each task.attachments as attachment}
						<Attachment {attachment} />
					{/each}
				</div>
			{/if}

			<section
				class="border border-[#E0E0E0] rounded-[12px] h-[104px] w-[440px] px-[15px] py-[15px]"
			>
				<form action="" method="post" class="">
					<div class="flex flex-row gap-[20px]">
						<object
							data={$page.data.session.user?.image}
							type="image/jpg"
							class="-z-1 h-[35px] w-[35px] rounded-full"
							title="profile picture"
						>
							<div
								class="h-[30px] w-[30px] rounded-full bg-[#BDBDBD] flex items-center justify-center"
							>
								<span class="text-md uppercase">{$page.data.session?.user?.name?.split('')[0]}</span
								>
							</div>
						</object>

						<input
							type="text"
							name="comment"
							id="comment"
							placeholder="Write a comment..."
							class="outline-none w-full"
						/>
					</div>

					<button
						type="submit"
						class="mt-3 flex items-end text-sm px-2 py-2 bg-[#0C66E4] hover:bg-[#0055CC] rounded-[8px] text-white"
						>Comment</button
					>
				</form>
			</section>
		</div>

		<!-- Content 2 - Actions  -->
		<div class="flex flex-col w-[150px] mt-[20px] h-full gap-[10px]">
			{#if $page.data.session?.user?.email === board.user?.email}
				<SelectMembersTask {members} />
				<SelectLabelsTask taskId={task.id} on:addTask={refresh} />
				<SelectTaskCover taskId={task.id} on:updatedCover={refresh} />
			{/if}
		</div>
	</section>
</dialog>

<style>
	dialog[open] {
		animation: fadeIn 0.2s ease-in-out forwards;
	}

	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.8);
	}

	/* Animación de entrada */
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.8);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
