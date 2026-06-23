export const handle = async ({ event, resolve }) => {
	return await resolve(event, {
		preload: ({ type }) => type === 'js' || type === 'css' || type === 'font'
	});
};
