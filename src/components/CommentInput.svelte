<script lang="ts">
	import { page } from '$app/stores';
	import * as Avatar from '$lib/components/ui/avatar';
	import Button from '$lib/components/ui/button/button.svelte';
	import PaperClipIcon from './icons/PaperClipIcon.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
</script>

<form action="" method="post" class="flex flex-row items-center gap-3">
	<Avatar.Root class="h-8 w-8">
		<Avatar.Image src={$page.data.session?.user?.image} alt="profile picture" />
		<Avatar.Fallback class="text-sm">{$page.data.session?.user?.name?.split('')[0]}</Avatar.Fallback
		>
	</Avatar.Root>
	<div>
		<Input
			type="text"
			placeholder="Write a comment..."
			class="max-w-xs outline-none w-[300px] rounded-[15px] h-8 hover:bg-[#f5f5f5] transition-colors duration-150"
			autocomplete="off"
		/>
	</div>
	<Button variant="ghost" size="icon">
		<PaperClipIcon className="h-4 w-4" />
	</Button>
</form>
