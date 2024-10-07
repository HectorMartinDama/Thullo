<script lang="ts">
	import type { Priority } from '$lib/types';

	export let priority: Priority;
	export let inPreviewBoard = true;

	const priorityColors: { [key in Priority]: string } = {
		1: '#d1453b',
		2: '#eb8909',
		3: '#246fe0',
		4: '#999999'
	};
</script>

<span
	class="{inPreviewBoard ? 'small' : 'normal'} border-2 border-[#999999] rounded-full"
	style="border-color: {priorityColors[priority]};"
></span>

<style>
	.normal {
		height: 18px;
		width: 18px;
	}

	.small {
		width: 15px;
		height: 15px;
	}
</style>
