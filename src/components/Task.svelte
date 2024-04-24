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
	import { getTaskById } from '$lib/requestsBackend';
	import { onMount } from 'svelte';
	import AddAttachments from './AddAttachments.svelte';

	let dialog: HTMLDialogElement | null;
	let sessionToken: string | undefined;
	export let task: TaskItem;
	export let members: User[] | undefined;
	export let board: Board;

	const refresh = async () => {
		task = await getTaskById(sessionToken, task.id);
		console.log(task.id, 'despues del refresh');
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
			<h1 class="mt-[20px] mb-[35px] text-xl font-semibold">{task.title}</h1>
			<section class="flex flex-row gap-[40px] mb-[15px]">
				<div class="flex gap-[7px]">
					<NoteIcon />
					<p class="text-[#BDBDBD] font-semibold">Description</p>
				</div>
				<button
					class="py-1 px-3 rounded-[8px] border border-[#BDBDBD] text-[#828282] flex justify-center items-center gap-[7px]"
				>
					<EditIcon />
					Edit
				</button>
			</section>

			<section class="w-[440px]">
				<form action="" method="post">
					<textarea
						name="description"
						id="description"
						class="max-h-[220px] min-h-[220px] w-full resize-none rounded-[8px] px-[15px] py-[15px]"
						placeholder="Add description"
					></textarea>
				</form>
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
							class="-z-1 h-[30px] w-[30px] rounded-full"
							title="profile picture"
						>
							<div
								class="h-[30px] w-[30px] rounded-full bg-[#BDBDBD] flex items-center justify-center"
							>
								<span class=" text-md">hola</span>
							</div>
						</object>

						<input
							type="text"
							name="comment"
							id="comment"
							placeholder="Write a comment..."
							class="outline-none"
						/>
					</div>

					<button type="submit" class="bg-[#2F80ED] h-[26px] w-[70px] text-white rounded-[8px]"
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
