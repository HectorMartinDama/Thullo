<script lang="ts">
	import type { Label } from '$lib/types';
	import { TagIcon } from 'lucide-svelte';
	export let label: Label;
</script>

<div class="flex flex-row gap-1 items-center justify-center">
	<TagIcon class="h-3 w-3 stroke-[#808080]" />
	<span class="font-regular text-xs text-[#808080]">{label.title}</span>
</div>
