<script lang="ts">
	import { getWeather } from './weather.remote';
</script>

<ul>
	{#each { length: 5 }, index}
		{@const weather = await getWeather(index)}
		<li>{index} - {JSON.stringify(weather)}</li>
	{/each}
</ul>
