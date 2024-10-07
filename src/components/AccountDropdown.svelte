<script lang="ts">
	import { page } from '$app/stores';
	import { enhance, applyAction } from '$app/forms';
	import { signOut } from '@auth/sveltekit/client';
	import LogoutIcon from './icons/LogoutIcon.svelte';
	import { theme } from '$lib/stores/theme';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { setMode } from 'mode-watcher';

	import SettingsIcon from './icons/SettingsIcon.svelte';
	import LightIcon from './icons/LightIcon.svelte';
	import DarkIcon from './icons/DarkIcon.svelte';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Avatar.Root class="h-9 w-9">
			<Avatar.Image src={$page.data.session?.user?.image} alt="profile picture" />
			<Avatar.Fallback>{$page.data.session?.user?.name?.split('')[0]}</Avatar.Fallback>
		</Avatar.Root>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Label>My Account</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item href="/settings" class="px-2 py-2.5 cursor-pointer">
				<SettingsIcon className="mr-2 w-4 h-4" />
				<span>Settings</span>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger class="px-2 py-2.5">
					<span>Theme</span>
				</DropdownMenu.SubTrigger>
				<DropdownMenu.SubContent>
					<DropdownMenu.Item class="px-2 py-2.5">
						<form
							class="w-full h-full"
							method="POST"
							action="?/theme"
							use:enhance={async () => {
								$theme = 'light';
								setMode('light'); // shacdn light
								return async ({ result }) => {
									await applyAction(result);
								};
							}}
						>
							<button class=" inline-flex items-center w-full h-full">
								<LightIcon className="mr-2 h-4 w-4" />
								<span>Light</span>
							</button>
						</form>
					</DropdownMenu.Item>
					<DropdownMenu.Item class="px-2 py-2.5">
						<form
							class="w-full h-full"
							method="POST"
							action="?/theme"
							use:enhance={async () => {
								$theme = 'dark';
								setMode('dark'); // shacdn dark mode
								return async ({ result }) => {
									await applyAction(result);
								};
							}}
						>
							<button class=" inline-flex items-center w-full h-full">
								<DarkIcon className="mr-2 h-4 w-4" />
								Dark
							</button>
						</form>
					</DropdownMenu.Item>
				</DropdownMenu.SubContent>
			</DropdownMenu.Sub>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item
			class="px-2 py-2.5 cursor-pointer"
			on:click={() => signOut({ callbackUrl: '/' })}
		>
			<LogoutIcon className="mr-2 h-4 w-4" />
			<span>Log out</span>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
