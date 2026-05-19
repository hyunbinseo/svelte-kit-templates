<script lang="ts">
	import { goto } from '$app/navigation';

	const { data } = $props();

	(() => {
		// (property) path: string
		goto(data.path);
	})();
</script>
