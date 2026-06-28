import { resolve } from '$app/paths';
import { redirect } from '@sveltejs/kit';
import { randomUUID } from 'node:crypto';

export const load = ({ cookies, url }) => {
	cookies.set('session', '1', { path: '/', httpOnly: true, sameSite: 'lax' });
	redirect(
		303,
		resolve('/[id]', {
			id: url.searchParams.has('random') ? randomUUID() : 'static'
		})
	);
};
