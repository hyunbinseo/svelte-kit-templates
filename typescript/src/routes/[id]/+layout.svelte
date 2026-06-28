<script lang="ts">
	import Component from './Component.svelte';
	import { getItem } from './item.remote';
	import { logout } from './logout.remote';

	let { params, children } = $props();

	// When revisiting this page after logout, the server is not called
	// This is undefined probably because it retrieves from the cache?
	// If the cached value is redirect with undefined, should reevaluate
	const item = $derived(await getItem(params.id));
	$inspect(item);
</script>

<Component id={params.id} title={item.name}></Component>

{@render children()}

<form {...logout}>
	<button>Logout</button>
</form>
