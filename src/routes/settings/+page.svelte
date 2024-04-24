<script lang="ts">
	import { onMount } from 'svelte';
	import CloseIcon from '../../components/icons/CloseIcon.svelte';
	import { page } from '$app/stores';

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
		<h1 class="text-3xl font-semibold pb-[60px]">Account Settings</h1>
		<hr />
	</header>

	<div class="flex flex-row gap-12">
		<div class="w-[240px] h-[240px] mt-[40px]">
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
		<div class="flex flex-col items-center justify-center mt-[40px] gap-10">
			<div
				class="h-[200px] w-[900px] bg-[#FAFAFA] dark:bg-[#282e33] rounded-[8px] px-[30px] py-[30px]"
			>
				<h1 class="text-xl mb-3">Delete Account</h1>
				<p class="text-sm mb-3">
					Permanently remove your Personal Account and all of its contents from the Tullo platform.
					This action is not reversible, so please continue with caution.
				</p>
				<div class="flex justify-end">
					<button
						on:click={() => deleteAccountDialog.showModal()}
						class="py-2 px-2 rounded-[4px] text-sm bg-red-600 transition-colors duration-150 hover:bg-[#AE292E] text-white"
						>Delete Account</button
					>
				</div>
			</div>
			<div
				class="flex flex-row items-center justify-between w-[900px] bg-[#FAFAFA] dark:bg-[#282e33] rounded-[8px] px-[30px] py-[30px]"
			>
				<h1 class="text-xl">View transitions / Animations</h1>
				{#if enableViewTransitions}
					<span class="text-sm text-green-600">Support</span>
				{:else}
					<span class="text-sm text-red-600">Not Support</span>
				{/if}
			</div>
		</div>
	</div>
</section>

<dialog bind:this={deleteAccountDialog} class="w-[480px] h-[400px] rounded-[8px]">
	<form action="?/deleteAccount" method="post">
		<header>
			<h3 class="font-semibold text-2xl">Delete Account</h3>
			<button on:click={() => closeDialog()}>
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
