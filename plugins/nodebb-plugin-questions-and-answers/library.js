'use strict';

const Posts = require.main.require('./src/posts');
const routeHelpers = require.main.require('./src/routes/helpers');

const plugin = module.exports;

// Set the official status of a post
const setOfficial = async (data) => {
	const { pid, official } = data;
	await Posts.setPostField(pid, 'official', official);
};

plugin.addApiRoute = async ({ router, middleware, helpers }) => {
	const middlewares = [middleware.ensureLoggedIn];

	// Adds API route to toggle official status of a post
	routeHelpers.setupApiRoute(
		router,
		'post',
		'/posts/official/:pid',
		middlewares,
		async (req, res) => {
			const { body } = req;
			await setOfficial(body);
			helpers.formatApiResponse(200, res);
		},
	);
};
