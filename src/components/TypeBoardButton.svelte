<script lang="ts">
	import type { Board, Visibility } from '$lib/types';
	import { Switch } from '$lib/components/ui/switch';
	import { MESSAGE_TYPE_BOARD } from '$lib/types';

	import { page } from '$app/stores';
	import { toast } from 'svelte-sonner';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';

	import type { SubmitFunction } from '@sveltejs/kit';

	import { createEventDispatcher } from 'svelte';
	import { enhance } from '$app/forms';
	import { Link, Check, Globe, Lock } from 'lucide-svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	const dispatch = createEventDispatcher();

	let isAnimating = false;
	let isCopied = false;
	export let board: Board;
	let prueba: HTMLDivElement;
	$: currentTaskUrl = $page.url;

	const submitChangeVisibility: SubmitFunction = () => {
		return async ({ result, formData }) => {
			const visibility = formData.get('visibility');
			if (result.type === 'success') {
				dispatch('changeVisibility');
				toast.success(`The board has changed to ${visibility}`, {
					position: 'bottom-right',
					duration: 4000
				});
			}
		};
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(currentTaskUrl.toString()).then(() => {
			isCopied = true;
			isAnimating = true;
			setTimeout(() => {
				isCopied = false;
				isAnimating = false;
			}, 1500);
		});
	};

	const capitalizeFirstLetter = (text: string) => {
		return text.charAt(0).toUpperCase() + text.slice(1);
	};

	const changeVisibility = () => {
		if (board.visibility === 'public') {
			board.visibility = 'private';
		} else {
			board.visibility = 'public';
		}
	};
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline', size: 'sm' })}>
		{#if board.visibility === 'public'}
			<Globe class="mr-2 h-4 w-4" />
		{:else if board.visibility === 'private'}
			<Lock class="mr-2 h-4 w-4" />
		{/if}
		<span>{capitalizeFirstLetter(board.visibility)}</span>
	</Dialog.Trigger>
	<Dialog.Content class="w-[540px]">
		<Dialog.Header>
			<Dialog.Title class="mb-2">Share Chat</Dialog.Title>
			<Dialog.Description class="dark:text-white">
				{#if board.visibility === 'public'}
					{MESSAGE_TYPE_BOARD.public.value}
				{:else if board.visibility === 'private'}
					{MESSAGE_TYPE_BOARD.private.value}
				{/if}
			</Dialog.Description>
		</Dialog.Header>

		<form action="?/changeVisibility" method="post" use:enhance={submitChangeVisibility}>
			<div
				class="flex flex-row w-full justify-between items-center gap-3 border rounded-md p-2 mb-6"
			>
				<div>
					<h1 class="text-sm font-medium mb-1 dark:text-white">Public with link</h1>
					<p class="text-sm text-gray-500 dark:text-[#9CA3AF]">
						Anyone with the link can view the board
					</p>
				</div>
				<Switch
					checked={board.visibility === 'public'}
					onCheckedChange={changeVisibility}
					class="h-4 w-9 data-[state=checked]:bg-[#2463eb] ring-blue-600 border "
				/>
			</div>

			<input type="hidden" name="visibility" value={board.visibility} />

			<Dialog.Footer>
				<Button
					on:click={copyToClipboard}
					type="button"
					variant="outline"
					class="h-[32px] transition-all duration-300 ease-in-out {isAnimating
						? 'animate-pulse'
						: ''}"
					disabled={board.visibility === 'private'}
				>
					{#if isCopied}
						<Check class="mr-2 h-4 w-4 stroke-green-500" />
					{:else}
						<Link class="mr-2 h-4 w-4" />
					{/if}
					Copy Link
				</Button>
				<Button type="submit" variant="default" class="h-[32px]">Done</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
