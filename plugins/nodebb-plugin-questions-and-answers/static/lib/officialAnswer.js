import * as components from "components";
import * as api from "api";
import * as alerts from "alerts";

const init = () => {
	markAsOfficial();
	unmarkAsOfficial();
};

const markAsOfficial = () => {
	const buttons = components.get("post/markOfficial");
	toggleOfficial(buttons, true);
};

const unmarkAsOfficial = () => {
	const buttons = components.get("post/unmarkOfficial");
	toggleOfficial(buttons, false);
};

const toggleOfficial = (buttons, officialStatus) => {
	buttons.each(async function () {
		const button = $(this);
		const pid = button.parents("[data-pid]").data("pid");
		const postData = await api.get(`/posts/${pid}`);
		const editedData = { ...postData, official: officialStatus };
		button.on("click", function () {
			api.post(`/plugins/posts/official/${pid}`, editedData, function (err) {
				if (err) {
					if (!app.user.uid) {
						ajaxify.go("login");
						return;
					}
					return alerts.error(err);
				}
			});
		});
	});
};

init();