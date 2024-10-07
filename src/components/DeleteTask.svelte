<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Trash } from 'lucide-svelte';
	import showDialogDeleteTask from '$lib/stores/showDeleteTask';
	import type { deleteTaskRequest } from '$lib/requestsBackend';
	import { onMount } from 'svelte';

	export let taskTitle: string;
	export let taskId: string;
	export let showButton: boolean;

	$: showModal = $showDialogDeleteTask;

	const closeModal = () => {
		showDialogDeleteTask.set(false);
	};
</script>

<AlertDialog.Root portal={null} open={showModal}>
	{#if showButton}
		<AlertDialog.Trigger asChild let:builder>
			<Button builders={[builder]} variant="ghost" class="text-[13px] w-full h-[35.5px] p-2">
				<Trash class="mr-2 h-4 w-4  stroke-[#b03d32]" />
				<span class="text-[#b03d32]">Delete</span>
				<DropdownMenu.Shortcut>⌘⌫</DropdownMenu.Shortcut>
			</Button>
		</AlertDialog.Trigger>
	{/if}
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title class="text-[16px] font-semibold">Delete Task</AlertDialog.Title>
			<AlertDialog.Description>
				The task <strong>{taskTitle}</strong> will be permanently deleted.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel on:click={closeModal} class="font-semibold text-[13px] h-8 text-[#1a1a1a]"
				>Cancel</AlertDialog.Cancel
			>
			<form method="POST" action="?/deleteTask">
				<input hidden name="id" id="id" value={taskId} />
				<AlertDialog.Action
					type="submit"
					class="font-semibold bg-[#dc4c3e] text-[13px] h-8 hover:bg-[#c3392c] transition-colors duration-150"
					>Delete</AlertDialog.Action
				>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
