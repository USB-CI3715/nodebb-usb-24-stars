import * as components from 'components'; // eslint-disable-line import/no-unresolved
import * as api from 'api'; // eslint-disable-line import/no-unresolved
import * as alerts from 'alerts'; // eslint-disable-line import/no-unresolved

const toggleOfficial = (buttons, officialStatus) => {
	buttons.each(async function () {
		const button = $(this); // eslint-disable-line no-undef
		const pid = button.parents('[data-pid]').data('pid');
		const editedData = { pid, official: officialStatus };
		button.on('click', () => {
			api.post(`/plugins/posts/official/${pid}`, editedData, (err) => {
				if (err) {
					if (!app.user.uid) { // eslint-disable-line no-undef
						ajaxify.go('login'); // eslint-disable-line no-undef
						return;
					}
					return alerts.error(err);
				}
			});
		});
	});
};

const markAsOfficial = () => {
	const buttons = components.get('post/markOfficial');
	toggleOfficial(buttons, true);
};

const unmarkAsOfficial = () => {
	const buttons = components.get('post/unmarkOfficial');
	toggleOfficial(buttons, false);
};

const init = () => {
	markAsOfficial();
	unmarkAsOfficial();
};

init();
