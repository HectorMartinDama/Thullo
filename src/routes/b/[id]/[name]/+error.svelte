<script lang="ts">
	import { page } from '$app/stores';
	import { signIn } from '@auth/sveltekit/client';
</script>

<section class="h-screen w-full flex flex-col items-center justify-center">
	<h1 class="font-semibold">Board not found.</h1>

	<p>
		This board may be private. If someone gave you this link, they may need to share the board with
		you or invite you to their Workspace.
	</p>

	<div class="flex flex-row gap-2">
		<h3>Not <span>{$page.data.session?.user?.name}</span>?.</h3>
		<button on:click={() => signIn('google', { callbackUrl: '/boards' })}>Switch accounts</button>
	</div>

	<a id="btn" href="/boards">View all boards</a>
</section>

<style>
	h1 {
		font-size: 26px;
		color: #626f86;
		margin-bottom: 20px;
	}

	span {
		font-size: 14px;
		font-weight: 700;
		color: #172b4d;
	}

	p {
		font-size: 18px;
		width: 600px;
		color: #626f86;
		margin-bottom: 20px;
	}

	h3 {
		color: #626f86;
	}

	#btn {
		margin-top: 40px;
		padding: 10px 10px;
		background-color: #0c66e4;
		border-radius: 12px;
		color: white;
	}

	button:hover {
		text-decoration: underline; /* Subrayado al pasar el cursor */
	}

	button {
		color: #0c66e4;
	}
</style>
