import { query } from '$app/server';
import { integer, number, pipe } from 'valibot';

export const getWeather = query.batch(pipe(number(), integer()), (cityIds) => {
	const lookup = new Map<number, { min: number; max: number }>([
		[0, { min: 0, max: 0 }],
		[1, { min: 0, max: 0 }],
		[2, { min: 0, max: 0 }],
		[3, { min: 0, max: 0 }],
		[4, { min: 0, max: 0 }]
	]);
	return (cityId) => lookup.get(cityId);
});
