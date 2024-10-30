<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import type { User } from 'lib/types';

	export let admin: User;
	export let members: User[] | [];
</script>

<div class="flex -space-x-4">
	{#if members?.length > 0}
		<Tooltip.Root>
			<Tooltip.Trigger>
				<Avatar.Root class="w-8 h-8 hover:z-10 transition-transform hover:scale-110">
					<Avatar.Image src={admin.image} alt={admin.name} />
					<Avatar.Fallback>{admin.name.split('')[0]}</Avatar.Fallback>
				</Avatar.Root>
			</Tooltip.Trigger>
			<Tooltip.Content side="bottom">
				<p class="text-xs">{admin.name}</p>
			</Tooltip.Content>
		</Tooltip.Root>
		{#each members.slice(0, 4) as member}
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Avatar.Root class="w-8 h-8  hover:z-10 transition-transform hover:scale-110">
						<Avatar.Image src={member.image} alt={member.name} />
						<Avatar.Fallback>{member.name.split('')[0]}</Avatar.Fallback>
					</Avatar.Root>
				</Tooltip.Trigger>
				<Tooltip.Content side="bottom">
					<p class="text-xs">{member.name}</p>
				</Tooltip.Content>
			</Tooltip.Root>
		{/each}
		{#if members.length > 4}
			<Avatar.Root class="w-9 h-9  hover:z-10 transition-transform hover:scale-110">
				<Avatar.Fallback class="bg-gray-100 text-gray-600 text-sm dark:text-white dark:bg-[#31393f]"
					>+{members.length - 4}</Avatar.Fallback
				>
			</Avatar.Root>
		{/if}
	{/if}
</div>
