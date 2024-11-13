'use strict';

const Posts = require.main.require('./src/posts');
const Topics = require.main.require('./src/topics');
const User = require.main.require('./src/user');
const routeHelpers = require.main.require('./src/routes/helpers');

const plugin = module.exports;

// Set the official status of a post
const setOfficial = async (data) => {
	const { pid, official } = data;
	await Posts.setPostField(pid, 'official', official);

	// Notify topic followers
	if (official) {
		const topic = await Topics.getTopicData(data.tid);
		const notificationData = {
			...data,
			content: `Answer marked as official: ${data.content}`,
			topic,
		};
		await Topics.notifyFollowers(notificationData, null, {
			type: 'new-reply',
			bodyShort: 'Answer marked as official',
			nid: `official_answer:tid:${notificationData.topic.tid}:pid:${notificationData.pid}`,
			mergeId: `notifications:user-posted-to|${notificationData.topic.tid}`,
		});
	}
};

// Set the favorite status of a post
const setFavorites = async (data) => {
	const { uid, favorites } = data;
	await User.setUserField(uid, "favorite", favorites);
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

	// Adds API route to favorites
	routeHelpers.setupApiRoute(
		router,
		"post",
		"/users/favorites/:uid",
		middlewares,
		async (req, res) => {
			const { body } = req;
			await setFavorites(body);
			helpers.formatApiResponse(200, res);
		},
	);

	// Adds API route to get favoritesº
	routeHelpers.setupApiRoute(
		router,
		"get",
		"/users/favorites/:uid",
		middlewares,
		async (req, res) => {
			const { uid } = req.params;
			const favorites = await User.getUserField(uid, "favorite");
			helpers.formatApiResponse(200, res, favorites);
		},
	);

	// Adds API route to get topics favorites
	routeHelpers.setupApiRoute(
		router,
		"get",
		"/topics/:tid",
		middlewares,
		async (req, res) => {
			const { tid } = req.params;
			const topics = await Topics.getTopicData(tid);
			helpers.formatApiResponse(200, res, topics);
		},
	);
};