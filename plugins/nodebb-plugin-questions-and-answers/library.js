"use strict";

const Posts = require.main.require("./src/posts");
const Topics = require.main.require("./src/topics");
const routeHelpers = require.main.require("./src/routes/helpers");

const plugin = module.exports;

// Set the official status of a post
const setOfficial = async (data) => {
	const { pid, official } = data;
	await Posts.setPostField(pid, "official", official);

	// Notify topic followers
	if (official) {
		const topic = await Topics.getTopicData(data.tid);
		const notificationData = {
			...data,
			content: `Answer marked as official: ${data.content}`,
			topic,
		};
		await Topics.notifyFollowers(notificationData, null, {
			type: "new-reply",
			bodyShort: "Answer marked as official",
			nid: `official_answer:tid:${notificationData.topic.tid}:pid:${notificationData.pid}`,
			mergeId: `notifications:user-posted-to|${notificationData.topic.tid}`,
		});
	}
};

plugin.addApiRoute = async ({ router, middleware, helpers }) => {
	const middlewares = [middleware.ensureLoggedIn];

	// Adds API route to toggle official status of a post
	routeHelpers.setupApiRoute(
		router,
		"post",
		"/posts/official/:pid",
		middlewares,
		async (req, res) => {
			const { body } = req;
			await setOfficial(body);
			helpers.formatApiResponse(200, res);
		},
	);
};
