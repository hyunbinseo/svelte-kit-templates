import type { HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = (error) => {
	console.log(error);
	// "type": "error",
	// "error": { "message": "Error: 403" },
	// "status": 403
};
