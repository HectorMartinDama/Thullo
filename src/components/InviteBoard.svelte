<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Board } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import CloseIcon from './icons/CloseIcon.svelte';
	import LinkIcon from './icons/LinkIcon.svelte';
	import SharedIcon from './icons/SharedIcon.svelte';
	import toast from 'svelte-french-toast';
	import { onDestroy, onMount } from 'svelte';

	export let board: Board;
	let dialog: HTMLDialogElement | null;
	let emailValue: string = '';

	const submitAddMember: SubmitFunction = () => {
		return async ({ result, update }) => {
			console.log('resultado', result);
			if (result.type === 'success') {
				toast.success('Invitation sent', {
					position: 'bottom-right',
					duration: 8000
				});
			}
		};
	};

	const handleOutsideClick = (event: MouseEvent) => {
		if (event.target === dialog) dialog?.close();
	};

	onMount(() => {
		dialog?.addEventListener('click', handleOutsideClick);
	});

	onDestroy(() => {
		dialog?.removeEventListener('click', handleOutsideClick);
	});
</script>

<button
	on:click={() => {
		dialog?.showModal();
	}}
	class="flex items-center justify-center text-center bg-[#F2F2F2] dark:bg-[#323940] h-[36px] w-[108px] rounded-[8px] text-sm gap-2 hover:bg-[#d0d4db] dark:hover:bg-[#3d4750] duration-150 transition-colors font-medium text-[#828282] dark:text-[#B6C2CF]"
>
	<SharedIcon />
	Share
</button>

<dialog
	bind:this={dialog}
	class="h-[264px] w-[584px] px-[24px] py-[20px] rounded-[8px] dark:bg-[#282e33] dark:text-[#B6C2CF] text-[#172B4D]"
>
	<header class="flex justify-between mb-[25px]">
		<h1 class="text-xl font-medium">Share board</h1>
		<button on:click={() => dialog?.close()}><CloseIcon /></button>
	</header>

	<section class="flex flex-col justify-between" id="content">
		<form
			action="?/addMember"
			method="post"
			class="flex justify-between"
			use:enhance={submitAddMember}
		>
			<input
				type="email"
				placeholder="Email address"
				class="w-[337px] h-[40px] outline-none border px-4 dark:bg-[#22272b] rounded-[8px] transition-colors duration-150 dark:hover:bg-[#3d4750] hover:bg-[#dcdfe4]"
				bind:value={emailValue}
				name="email"
			/>
			<button
				type="submit"
				disabled={!emailValue.trim()}
				class="py-2 px-3 text-sm rounded-[8px] border transition-colors duration-150 hover:bg-[#F0F1F4] font-normal"
				>Share</button
			>
		</form>

		<div class="flex justify-between">
			<div class="flex flex-row items-center gap-4">
				<img
					src={board.user.image}
					alt="admin profile picture"
					class="h-[36px] w-[36px] rounded-full"
				/>
				<div>
					<span>{board.user.name}</span>
					<div>
						<span class="text-sm">{board.title} - {board.visibility}</span>
					</div>
				</div>
			</div>
			<div
				class="h-[32px] px-[15px] font-medium text-sm dark:bg-[#323940] bg-[#f0f1f4] transition-colors duration-150 dark:hover:bg-[#3d4750] flex justify-center items-center rounded-[8px]"
			>
				Admin
			</div>
		</div>

		<div class="flex justify-between">
			<div class="flex flex-row items-center gap-4">
				<div
					class="h-[36px] w-[36px] rounded-[8px] dark:bg-[#323940] bg-[#f0f1f4] flex justify-center items-center"
				>
					<LinkIcon />
				</div>
				<div>
					<span>Anyone with the board share link</span>
					<div>
						<span class="text-sm">Copy link</span>
					</div>
				</div>
			</div>
			<div
				class="h-[32px] px-[15px] font-medium text-sm dark:bg-[#323940] bg-[#f0f1f4] flex justify-center items-center rounded-[8px]"
			>
				Can join has member
			</div>
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

	:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	#content {
		height: calc(100% - 50px);
	}
</style>
