<script lang="ts">
	import type { TaskItem } from '$lib/types';
	import { onMount } from 'svelte';
	import DialogTask from './DialogTask.svelte';
	import { createEventDispatcher } from 'svelte';
	import CloseIcon from './icons/CloseIcon.svelte';
	import EditIcon from './icons/EditIcon.svelte';
	import NoteIcon from './icons/NoteIcon.svelte';
	import AddIcon from './icons/AddIcon.svelte';
	import Attachment from './Attachment.svelte';
	import { page } from '$app/stores';

	let dialog: HTMLDialogElement | null;
	export let task: TaskItem;
	let isDragging = false;

	$: taskClass = isDragging ? 'dragging' : '';

	// cuando he movido la task cambio el estilo
	const handleDragStart = (e: DragEvent) => {
		const id = (e.target as HTMLElement).getAttribute('id');
		const originalTask = document.getElementById(id);
		const skeletonTask = document.createElement('div');
	};

	// cuando no he terminado de mover
	const handleDragEnd = () => {
		isDragging = false;
	};

	function clickOutside(element, callbackFunction) {
		function onClick(event) {
			if (!element.contains(event?.target)) {
				callbackFunction();
			}
		}
		document.addEventListener('click', onClick);
		return {
			update(newCallBackFunction) {
				callbackFunction = newCallBackFunction;
			},
			destroy() {
				document.removeEventListener('click', onClick);
			}
		};
	}
</script>

<div
	role="region"
	draggable="true"
	on:dragstart={(e) => handleDragStart(e)}
	on:dragend={handleDragEnd}
	id={task.id}
	on:click={() => {
		dialog?.showModal();
	}}
	class="cursor-grabbing bg-white dark:bg-[#22272B] text-[14px] dark:text-[#B6C2CF] max-w-[256px] w-[256px] shadow-md px-[10px] py-[10px] rounded-xl border-2 hover:border-[#0055CC] cursor-pointer"
>
	<!-- Content  -->
	{task.title}
</div>

<dialog bind:this={dialog} class="w-[660px] h-[1000px] rounded-[8px] px-[25px] py-[25px]">
	<header class="flex justify-end">
		<button on:click={() => dialog?.close()}>
			<CloseIcon />
		</button>
	</header>

	<!-- COVER -->
	<div class="w-full h-[130px] rounded-[12px] bg-[#E0E0E0] flex justify-center"></div>

	<section class="flex flex-row">
		<!-- Content 1  -->
		<div>
			<h1 class="mt-[20px] mb-[35px] text-lg">{task.title}</h1>
			<section class="flex flex-row gap-[40px] mb-[15px]">
				<div class="flex gap-[7px]">
					<NoteIcon />
					<p class="text-[#BDBDBD] font-semibold">Description</p>
				</div>
				<button
					class="h-[30px] w-[90px] rounded-[8px] border border-[#BDBDBD] text-[#828282] flex justify-center items-center gap-[7px]"
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

			<section class="flex flex-row gap-[40px] mb-[15px]">
				<div class="flex gap-[7px]">
					<NoteIcon />
					<p class="text-[#BDBDBD] font-semibold">Attachments</p>
				</div>
				<button
					class="h-[30px] w-[90px] rounded-[8px] border border-[#BDBDBD] text-[#828282] flex justify-center items-center gap-[7px]"
				>
					<AddIcon />
					Add
				</button>
			</section>

			{#if task.attachaments}
				{#each task.attachaments as attachament}
					<Attachment {attachament} />
				{/each}
			{/if}

			<section
				class="border border-[#E0E0E0] rounded-[12px] h-[104px] w-[440px] px-[15px] py-[15px]"
			>
				<form action="" method="post" class=" ">
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
			<button class="bg-[#F2F2F2] text-[#828282] rounded-[8px] h-[32px]">Members</button>
			<button class="bg-[#F2F2F2] text-[#828282] rounded-[8px] h-[32px]">Labels</button>
			<button class="bg-[#F2F2F2] text-[#828282] rounded-[8px] h-[32px]">Cover</button>
		</div>
	</section>
</dialog>

<style>
	dialog[open] {
		animation: fadeIn 0.2s ease-in-out forwards;
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
