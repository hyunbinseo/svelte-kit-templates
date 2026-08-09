import { form } from '$app/server';
import { MyFormSchema } from './my-form';

export const myForm = form(MyFormSchema, async () => {
	return { ok: true };
});
