import { resolve } from '$app/paths';
import { form, getRequestEvent } from '$app/server';
import { redirect } from '@sveltejs/kit';

export const logout = form(async () => {
	getRequestEvent().cookies.delete('session', { path: '/' });
	redirect(303, resolve('/'));
});
