<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import '../app.pcss';
	import Navbar from '../components/Navbar.svelte';
	import { page } from '$app/stores';
	import { theme } from '$lib/stores/theme';
	import { browser } from '$app/environment';
	import { Toaster } from 'svelte-french-toast';
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
	<Navbar />
{/if}

<slot />

<Toaster />
