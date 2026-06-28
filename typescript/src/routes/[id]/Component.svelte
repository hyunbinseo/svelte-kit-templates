<script lang="ts">
	import { getSubItem } from './item.remote';

	let {
		id,
		title
	}: {
		id: string;
		title: string;
	} = $props();

	const rawSubItem = $derived(await getSubItem(id));
</script>

<h1>{title}</h1>
<p>{rawSubItem.detail}</p>
