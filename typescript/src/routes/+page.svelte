<script lang="ts">
	import { MyFormSchema } from './my-form';
	import { myForm } from './my-form.remote';

	let removed = $state(false);
</script>

{#if !removed}
	<form {...myForm.preflight(MyFormSchema)}>
		<input {...myForm.fields.value.as('text')} />
	</form>
{/if}

<button
	onclick={() => {
		myForm.validate({ preflightOnly: true });
		removed = true;
	}}
>
	Trigger bug
</button>
