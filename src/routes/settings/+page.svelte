<script lang="ts">
	import { onMount } from 'svelte';
	import CloseIcon from '../../components/icons/CloseIcon.svelte';
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card/index.js';

	import Button from '$lib/components/ui/button/button.svelte';
	import { Switch } from '$lib/components/ui/switch';

	let enableViewTransitions: boolean;
	let deleteAccountDialog: HTMLDialogElement;
	let userNameValue: string;
	let phraseValue: string;
	let enable = false;

	$: if (userNameValue || phraseValue) checkDeleteAccount();

	const checkViewTransitions = () => {
		if (!document.startViewTransition) {
			return false;
		}
		return true;
	};

	const checkDeleteAccount = () => {
		if (
			userNameValue === $page.data.session.user.name?.split(' ').join('') &&
			phraseValue === 'delete my personal account'
		) {
			enable = true;
		} else {
			enable = false;
		}
	};

	const closeDialog = () => {
		userNameValue = '';
		phraseValue = '';
		deleteAccountDialog.close();
	};

	onMount(() => {
		enableViewTransitions = checkViewTransitions();
		console.log(enableViewTransitions);
	});
</script>

<section class="my-[50px] mx-[60px]">
	<header>
		<h1 class="text-2xl font-semibold mb-10">Account Settings</h1>
		<hr />
	</header>

	<div class="flex flex-row gap-12">
		<div class="w-[240px] h-[240px] mt-10">
			<ul class="">
				<li
					class="flex items-center text-sm h-[40px] rounded-[8px] transition-colors duration-150 hover:bg-[#f0f1f4] dark:hover:bg-[#31393F] pl-4 mb-2 cursor-pointer"
				>
					General
				</li>
				<li
					class="flex items-center text-sm h-[40px] rounded-[8px] transition-colors duration-150 hover:bg-[#f0f1f4] dark:hover:bg-[#31393F] pl-4 cursor-pointer text-[#666666]"
				>
					Preferences
				</li>
			</ul>
		</div>

		<div class="flex flex-col gap-5 mt-10">
			<Card.Root class="w-[630px] flex flex-row items-center justify-between">
				<Card.Header>
					<Card.Title class="text-md font-medium">Delete Account</Card.Title>
					<Card.Description
						>Permanently remove your Personal Account and all of its contents from the Tullo
						platform. This action is not reversible, so please continue with caution.</Card.Description
					>
				</Card.Header>
				<Card.Content>
					<Button
						variant="destructive"
						on:click={() => deleteAccountDialog.showModal()}
						class=" bg-[#dc4c3e] text-[13px] h-8 hover:bg-[#c3392c] transition-colors duration-150"
						>Delete Account</Button
					>
				</Card.Content>
			</Card.Root>

			<Card.Root class="w-[630px] flex flex-row items-center justify-between">
				<Card.Header>
					<Card.Title class="text-md font-medium">View transitions</Card.Title>
					<Card.Description>Your browser support View transitions</Card.Description>
				</Card.Header>
				<Card.Content>
					<Switch disabled bind:checked={enableViewTransitions} />
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</section>

<dialog bind:this={deleteAccountDialog} class="w-[480px] h-[400px] rounded-[8px]">
	<form action="?/deleteAccount" method="post">
		<header>
			<h3 class="font-semibold text-2xl">Delete Account</h3>
			<button type="reset" on:click={() => closeDialog()}>
				<CloseIcon />
			</button>
		</header>

		<div class="mx-[30px]">
			<p class="text-sm mb-4">
				Thullo will delete all of your boards, activity and all other resources belonging to your
				Personal Account.
			</p>

			<input type="hidden" name="email" value={$page.data.session?.user?.email} />

			<label for="username" class="text-sm"
				>Enter your username <span class="font-semibold"
					>{$page.data.session.user.name?.split(' ').join('')}</span
				> to continue:</label
			>
			<input
				type="text"
				id="username"
				class="w-full text-sm py-2 px-2 outline-none border rounded-[8px] mb-4"
				bind:value={userNameValue}
			/>

			<label for="verify" class="text-sm"
				>To verify, type <span class="font-semibold">delete my personal account</span> below:</label
			>
			<input
				type="text"
				id="verify"
				class="w-full text-sm py-2 px-2 outline-none border rounded-[8px]"
				bind:value={phraseValue}
			/>
		</div>

		<footer class="border-t">
			<menu>
				<button
					autofocus
					type="reset"
					on:click={() => deleteAccountDialog.close()}
					class="py-2 px-3 text-sm rounded-[8px] border transition-colors duration-150 hover:bg-[#F0F1F4] font-normal"
					>Cancel</button
				>
				<button
					type="submit"
					class="py-2 px-3 text-sm rounded-[8px] border transition-colors duration-150 hover:bg-[#F0F1F4] font-normal"
					disabled={!enable}>Delete</button
				>
			</menu>
		</footer>
	</form>
</dialog>

<style>
	dialog {
		display: grid;
		margin: auto;
		padding: 0;
		position: fixed;
		inset: 0;
	}

	dialog[open] {
		animation: fadeIn 0.2s ease-in-out forwards;
	}

	dialog:not([open]) {
		pointer-events: none;
		opacity: 0;
	}

	dialog > form {
		display: grid;
		grid-template-rows: auto 1fr auto;
		align-items: start;
		max-block-size: 80vh;
		max-block-size: 80dvb;
	}

	dialog > form > header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding-block: 30px;
		padding-inline: 30px;
	}

	dialog > form > footer {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		padding-inline: 30px;
		padding-block: 20px;
		background-color: #fafafa;
	}

	dialog > form > footer > menu {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		width: 100%;
		padding-inline-start: 0;
	}
</style>
