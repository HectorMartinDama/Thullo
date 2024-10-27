<script lang="ts">
	import { browser } from '$app/environment';
	import type { Board, TaskItem } from '$lib/types';
	import { createEventDispatcher, getContext, onDestroy, onMount } from 'svelte';
	import { animate, inView, timeline } from 'motion';
	import * as Avatar from '$lib/components/ui/avatar/index.js';

	import CommentInput from '../../../../../components/CommentInput.svelte';
	import SelectLabelsTask from '../../../../../components/SelectLabelsTask.svelte';
	import ChangeTaskPriority from '../../../../../components/ChangeTaskPriority.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	import { page } from '$app/stores';
	import { addTaskDescription, getTaskById, renameTitleTask } from '$lib/requestsBackend';
	import ArrowUpIcon from '../../../../../components/icons/ArrowUpIcon.svelte';
	import CloseIcon from '../../../../../components/icons/CloseIcon.svelte';
	import ArrowDownIcon from '../../../../../components/icons/ArrowDownIcon.svelte';
	import DescriptionIcon from '../../../../../components/icons/DescriptionIcon.svelte';
	import { goto } from '$app/navigation';
	import { addScript } from '$lib';
	import SelectDueDateTask from '../../../../../components/SelectDueDateTask.svelte';
	import PriorityTaskLevel from '../../../../../components/PriorityTaskLevel.svelte';
	import LabelItem from '../../../../../components/LabelItem.svelte';
	import DropDownMenuTask from '../../../../../components/DropDownMenuTask.svelte';
	import DeleteTask from '../../../../../components/DeleteTask.svelte';
	import { writable } from 'svelte/store';
	import showDialogDeleteTask from '$lib/stores/showDeleteTask';
	import Attachment from '../../../../../components/Attachment.svelte';
	import Attachments from '../../../../../components/Attachments.svelte';
	import { isArrayEmpty } from '$lib/utils';
	import { Toaster } from 'svelte-sonner';

	export let data;
	let show = false;
	let dialog: HTMLDialogElement | null = null;
	let task: TaskItem = data.task;
	let taskEditorDescription: HTMLDivElement;
	let taskEditorTitle: HTMLDivElement;
	let currentInputTitleValue: string = task.title;
	let currentInputDescriptionValue: string = task?.description;
	let board: Board = data.board;
	let sessionToken: string | undefined;
	let taskEditor = false;
	const tasks = board.lists?.flatMap((list) => list.tasks);

	let titleDom: HTMLHeadingElement;
	let headerTitleDom: HTMLHeadingElement;

	console.log($page.data.session?.user?.email, 'id del usuario', task);

	$: currentTaskId = $page.params.id;
	$: currentIndex = tasks?.findIndex((task) => task?.id == currentTaskId);

	const refresh = async () => {
		task = await getTaskById(sessionToken, task.id);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') nav_back();
	};

	const nav_back = () => {
		if (browser) goto(`/b/${board.id}/${addScript(board.title)}`);
	};

	const nextTask = () => {
		if (currentIndex < tasks.length - 1) {
			currentIndex++;
			goto(`/b/${board.id}/${addScript(board.title)}/${tasks[currentIndex].id}`).then(() => {
				location.reload();
			});
		}
	};

	const previousTask = () => {
		if (currentIndex > 0) {
			currentIndex--;
			goto(`/b/${board.id}/${addScript(board.title)}/${tasks[currentIndex]?.id}`, {
				replaceState: true
			}).then(() => {
				location.reload();
			});
		}
	};

	const handleOutsideClick = (event: MouseEvent) => {
		if (event.target === dialog) nav_back();
	};

	const dispatchCommandDeleteTask = (event: KeyboardEvent) => {
		if (event.metaKey && event.key === 'Backspace') {
			showDialogDeleteTask.set(true);
		}
	};

	//animate('#headerTitle', { opacity: 0, y: 50 }, { duration: 0 });

	onMount(() => {
		if (dialog) dialog.showModal();
		window.addEventListener('keydown', dispatchCommandDeleteTask);

		dialog?.addEventListener('click', handleOutsideClick);
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});

		inView('#taskTitle', () => {
			animate('#headerTaskTitle', { opacity: 0 }, { duration: 0.3 });
			return () => {
				animate('#headerTaskTitle', { opacity: [0, 1] }, { duration: 0.3 });
			};
		});

		return () => {
			unsubcribe;
			window.removeEventListener('keydown', dispatchCommandDeleteTask);
		};
	});

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

	const editTaskTitle = async () => {
		taskEditor = true;
		setTimeout(() => {
			if (taskEditorTitle) focusEndOfDiv(taskEditorTitle);
		}, 0);
	};

	const editTaskDescription = () => {
		taskEditor = true;
		setTimeout(() => {
			if (taskEditorDescription) {
				taskEditorDescription.focus();
				if (!task.description) {
					taskEditorDescription.innerText = '';
				}
			}
		}, 0);
	};

	const handleTaskTitle = (event) => {
		currentInputTitleValue = event.target.innerText;
	};

	const handleTaskDescription = (event) => {
		currentInputDescriptionValue = event.target.innerText;
	};

	const cancelOperation = () => {
		taskEditor = false;
	};

	const changeTitleDescription = async () => {
		if (
			task.title != currentInputTitleValue &&
			currentInputTitleValue.length > 0 &&
			task.description != currentInputDescriptionValue &&
			currentInputDescriptionValue.length > 0
		) {
			await Promise.all([
				renameTitleTask(sessionToken, task.id, currentInputTitleValue),
				addTaskDescription(sessionToken, task.id, currentInputDescriptionValue)
			]);
			task.title = currentInputTitleValue;
			task.description = currentInputDescriptionValue;
			taskEditor = false;
		} else if (
			task.description != currentInputDescriptionValue &&
			currentInputDescriptionValue.length > 0
		) {
			await addTaskDescription(sessionToken, task.id, currentInputDescriptionValue);
			task.description = currentInputDescriptionValue;
			taskEditor = false;
		} else if (task.title != currentInputTitleValue && currentInputTitleValue.length > 0) {
			await renameTitleTask(sessionToken, task.id, currentInputTitleValue);
			task.title = currentInputTitleValue;
			taskEditor = false;
		}
	};
</script>

<dialog bind:this={dialog} aria-modal="true" class="sm:max-w-[425px] min-w-[864px] rounded-xl">
	<header class="flex items-center py-2 px-4 justify-between border-b">
		<div id="headerTaskTitle" class="flex items-center gap-3 opacity-0">
			<PriorityTaskLevel priority={task.priority} inPreviewBoard={false} />
			<h1 class="text-[#202020] font-semibold text-[13px] flex flex-col">
				{task.title}
				<span class="text-xs text-[#666] font-light">in {board.title}</span>
			</h1>
		</div>

		<div class="flex">
			<Button
				variant="ghost"
				size="icon"
				on:click={previousTask}
				disabled={currentIndex === 0}
				autofocus={false}
			>
				<ArrowUpIcon />
			</Button>

			<Button
				variant="ghost"
				size="icon"
				on:click={nextTask}
				disabled={currentIndex === tasks.length - 1}
				autofocus={false}
			>
				<ArrowDownIcon />
			</Button>
			<div class="flex flex-0">
				<DropDownMenuTask {task} />
			</div>
			<Button on:click={nav_back} variant="ghost" size="icon">
				<CloseIcon className="h-4 w-4" />
			</Button>
		</div>
	</header>

	<div class="flex flex-row h-full">
		<div class="max-w-[600px] min-w-[600px] h-[600px] p-4 overflow-auto">
			<div id="taskTitle">
				{#if !taskEditor}
					<button on:click={editTaskTitle} class="flex items-center gap-3">
						<PriorityTaskLevel priority={task.priority} inPreviewBoard={false} />
						<h1
							class="flex items-center gap-3 text-xl font-semibold text-[#202020] truncate max-w-[510px] -tracking-wide"
						>
							{task.title}
						</h1>
					</button>
					<button
						on:click={editTaskDescription}
						class="flex flex-row items-center gap-1 text-[#999999] mt-4 text-sm ml-7"
					>
						{#if task.description}
							<span class="text-[#999999] text-sm truncate max-w-[510px]">
								{task.description}
							</span>
						{:else}
							<DescriptionIcon className="h-4 w-4" />
							Description
						{/if}
					</button>
				{:else}
					<form action="" class="flex flex-col justify-between min-h-[160px] ml-6">
						<div class="border border-[#e6e6e6] rounded-[10px] min-h-[115px] px-2 py-2 mb-2">
							<div
								bind:this={taskEditorTitle}
								on:input={handleTaskTitle}
								contenteditable="true"
								class="outline-none text-xl font-semibold -tracking-wide"
								aria-label="Nombre de la tarea"
							>
								{task.title}
							</div>
							<div
								contenteditable="true"
								data-placeholder="Escribe aquí..."
								class="outline-none mt-4 text-sm text-[#202020]"
								bind:this={taskEditorDescription}
								on:input={handleTaskDescription}
							>
								{#if task.description}
									<span class="text-[#999] text-sm">{task.description}</span>
								{:else}
									<div class="flex flex-row items-center gap-1 text-sm text-[#999] mt-[20px]">
										<DescriptionIcon className="h-4 w-4" />
										Description
									</div>
								{/if}
							</div>
						</div>

						<div class="flex justify-end gap-4">
							<Button variant="outline" class="h-8 text-xs bg-[#f5f5f5]" on:click={cancelOperation}
								>Discard</Button
							>
							<Button
								variant="destructive"
								class="bg-[#c3392c] h-8 text-xs"
								disabled={!currentInputTitleValue}
								on:click={changeTitleDescription}>Save</Button
							>
						</div>
					</form>
				{/if}
			</div>

			<hr class="ml-7 my-6" />

			<section class="ml-7">
				{#if task.attachments && !isArrayEmpty(task.attachments)}
					<Attachments attachments={task.attachments} on:removedAttachment={refresh} />
				{/if}
				<CommentInput on:addedAttachment={refresh} />
			</section>
		</div>

		<div class="w-full h-[600px] p-4 gap-4 bg-[#fcfaf8]">
			<p class="font-semibold text-[#666] text-xs mb-2">Proyect</p>
			<p class="w-full text-xs font-regular h-[28px]">{board.title}</p>

			<hr class="mb-2" />

			<p class="font-semibold text-[#666] text-xs mb-2">Created by</p>

			<div class="flex flex-row items-center gap-2 mb-2">
				<Avatar.Root class="h-6 w-6">
					<Avatar.Image src={task.user.image} alt="@shadcn" />
					<Avatar.Fallback>{task.user.name.charAt(0).toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>
				<span class="text-xs font-regular">{task.user.name}</span>
			</div>

			<!-- {#if $page.data.session?.user?.email === board.user?.email} -->
			<hr class="mb-2" />

			<SelectDueDateTask {task} on:changeDueDate={refresh} />

			<!-- <SelectMembersTask {members} /> -->
			<hr class="my-2" />

			<ChangeTaskPriority priority={task.priority} {task} on:changePriority={refresh} />

			<hr class="my-2" />
			<SelectLabelsTask {task} on:addTask={refresh} />
			{#if task.labels}
				<div class="ml-4 mt-2 flex flex-wrap w-full gap-2">
					{#each task.labels as label}
						<LabelItem {label} id={task.id} on:deleteLabel={refresh} />
					{/each}
				</div>
			{/if}
			<hr class="my-2" />
			<!-- {/if} -->
		</div>
	</div>
	<DeleteTask taskId={task.id} taskTitle={task.title} showButton={false} />
	<Toaster />
</dialog>

<style>
	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>
