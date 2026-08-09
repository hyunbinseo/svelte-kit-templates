import { nonEmpty, object, pipe, string } from 'valibot';

export const MyFormSchema = object({
	value: pipe(string(), nonEmpty())
});
