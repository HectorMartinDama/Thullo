<script lang="ts">
	import type { Label } from '$lib/types';
	export let label: Label;
	let backgroundColor = label.color.replace('1)', '0.2)'); // transparencia del 20%
</script>

<div
	class="text-xs font-light py-1 flex justify-center items-center rounded-[8px]"
	style="background-color: {backgroundColor}; color: {label.color}"
>
	{label.title}
</div>
