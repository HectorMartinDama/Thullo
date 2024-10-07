<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';

	export let name: string;
	export let description: string;
	export let image: string;
	export let role: Role;

	type Role = 'Admin' | 'Member';
</script>

<Card.Root class="w-full border-none mb-3 bg-secondary">
	<Card.Content class="flex items-center space-x-3 p-3 shadow-none">
		<Avatar.Root class="h-9 w-9">
			<Avatar.Image src={image} alt="User avatar" />
			<Avatar.Fallback>{name?.split('')[0]}</Avatar.Fallback>
		</Avatar.Root>
		<div class="flex-1 min-w-0">
			<div class="flex items-center justify-between">
				<h3 class="text-[13px] font-medium truncate dark:text-white">{name}</h3>
				<span
					class="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground ml-2"
				>
					{role}
				</span>
			</div>
			<p class="text-xs text-muted-foreground truncate dark:text-gray-400">{description}</p>
		</div>
	</Card.Content>
</Card.Root>
