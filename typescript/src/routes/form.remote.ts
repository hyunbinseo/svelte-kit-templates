import { resolve } from '$app/paths';
import { form } from '$app/server';
import { redirect } from '@sveltejs/kit';
import { object, optional, string } from 'valibot';

export const redirectForm = form(object({ id: optional(string()) }), () => {
	// NOTE Changing to external link works
	redirect(307, resolve('/a')); // form target is not respected
	redirect(307, 'https://svelte.dev/'); // form target is respected
});
