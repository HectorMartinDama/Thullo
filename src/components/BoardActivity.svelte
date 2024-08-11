<script lang="ts">
	import type { Activity } from '$lib/types';
	import { onMount } from 'svelte';
	import ActivityItem from './ActivityItem.svelte';

	let activities: Activity[];
	const QUERY =
		'{ getAllActivityBoard(boardId: "827b0fc0-eb34-49c4-8b31-c24fecdddfdd") { title, occured_on, user { name, email, image } } }';

	const getAllActivityBoard = async () => {
		return await fetch(`http://localhost:4000?query=${QUERY}`).then((res) => res.json());
	};

	onMount(async () => {
		const data = await getAllActivityBoard();
		activities = data.data.getAllActivityBoard;
	});
</script>

<section class=" max-h-full h-full overflow-auto mb-8">
	{#if activities}
		{#each activities as activity}
			<ActivityItem {activity} />
		{/each}
	{/if}
</section>
