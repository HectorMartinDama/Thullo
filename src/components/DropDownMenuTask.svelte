<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import OptionsIcon from './icons/OptionsIcon.svelte';
	import type { TaskItem } from '$lib/types';
	import { CopyPlusIcon, LinkIcon, Trash } from 'lucide-svelte';
	import { page } from '$app/stores';
	import DeleteTask from './DeleteTask.svelte';
	import { formatDate, pushSuccessNotification } from '$lib/utils';
	import { duplicateTaskRequest } from '$lib/requestsBackend';
	import { onMount } from 'svelte';

	export let task: TaskItem;
	let sessionToken: string | undefined;

	$: currentTaskUrl = $page.url;

	const duplicateTask = async () => {
		await duplicateTaskRequest(sessionToken, task.id, $page.params.boardId);
		pushSuccessNotification('Task duplicated');
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(currentTaskUrl.toString()).then(() => {
			pushSuccessNotification('Task link copied');
		});
	};

	onMount(() => {
		const unsubcribe = page.subscribe((value) => {
			sessionToken = value.data.token;
		});
		return unsubcribe;
	});
</script>

<DropdownMenu.Root portal={null}>
	<DropdownMenu.Trigger>
		<Button variant="ghost" size="icon">
			<OptionsIcon />
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content class="w-[250px] rounded-2xl">
		<DropdownMenu.Label class="font-normal text-xs text-[#666]"
			>Add {formatDate(task.createdAt)}</DropdownMenu.Label
		>
		<DropdownMenu.Separator />

		<DropdownMenu.Group>
			<DropdownMenu.Item
				on:click={duplicateTask}
				class="text-[13px]  py-2 cursor-pointer text-[#202020] gap-1"
			>
				<CopyPlusIcon class="mr-2 h-4 w-4" />
				<span>Duplicate</span>
			</DropdownMenu.Item>

			<DropdownMenu.Item
				class="text-[13px] py-2 cursor-pointer text-[#202020] gap-1"
				on:click={copyToClipboard}
			>
				<LinkIcon class="mr-2 h-4 w-4" />
				<span>Copy task link</span>
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DeleteTask taskId={task.id} taskTitle={task.title} showButton={true} />
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
