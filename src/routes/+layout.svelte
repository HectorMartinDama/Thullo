<script>
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import '../app.pcss';
	import Navbar from '../components/Navbar.svelte';
	import { page } from '$app/stores';
	import { theme } from '$lib/stores/theme';
	import { browser } from '$app/environment';
	import { Toaster } from 'svelte-sonner';
	import { ModeWatcher } from 'mode-watcher';

	export let data;

	$theme = data.theme;
	$: browser && (document.documentElement.dataset.theme = $theme);

	onNavigate((navigation) => {
		if (document.startViewTransition) {
			return new Promise((resolve) => {
				document.startViewTransition &&
					document.startViewTransition(async () => {
						resolve();
						await navigation.complete;
					});
			});
		}
	});
</script>

<!-- Cuando no cargue un board especifico -->
{#if !$page.params.id}
	<Navbar></Navbar>
{/if}

<main class="flex flex-col items-center justify-center dark:bg-[#1D2125]">
	<ModeWatcher />
	<slot></slot>
</main>

<Toaster></Toaster>
