import { getRequestEvent, query } from '$app/server';
import { redirect } from '@sveltejs/kit';
import { string } from 'valibot';

const requireSession = () => {
	const event = getRequestEvent();
	if (!event.cookies.get('session')) redirect(303, '/');
};

export const getItem = query(string(), async (id) => {
	console.log(Date.now());
	requireSession();
	return { id, name: `Item ${id}` };
});

export const getSubItem = query(string(), async (id) => {
	requireSession();
	return { id, detail: `Detail for ${id}` };
});
