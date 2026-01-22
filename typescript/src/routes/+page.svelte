<script>
	import { redirectForm } from './form.remote';

	const id = $props.id();
</script>

<form {...redirectForm} target="_blank">
	<button>Plain Submit</button>
	<button {...redirectForm.fields.id.as('submit', id)}>Submit with Spread</button>
</form>
