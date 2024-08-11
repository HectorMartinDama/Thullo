<script lang="ts">
	import type { Activity } from '$lib/types';
	export let activity: Activity;

	console.log(activity);
</script>

<div class="mb-4 last:mb-0">
	<div class="flex flex-row gap-2">
		<img
			src={activity.user.image}
			alt="profile image of {activity.user.name}"
			class="h-8 object-cover rounded-full"
		/>
		<div>
			<span class="font-bold text-sm">{activity.user.name}</span>
			<p class="text-sm">{activity.title}</p>

			<span class="text-xs">{activity.occured_on}</span>
		</div>
	</div>
</div>
