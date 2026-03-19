<script lang="ts">
	import { setCtx, type Ctx } from '$lib/context';
	import './layout.css';

	let { children } = $props();

	const ctx = $state<Ctx>({});
	setCtx(ctx);
</script>

{#if !!ctx.a && !ctx.b}
	<p><code>b</code> is not set</p>
{:else}
	<pre>{JSON.stringify(ctx)}</pre>
	{@render children()}
{/if}
