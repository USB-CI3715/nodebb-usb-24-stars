$(document).ready(function () {
	const tagToTidMap = {};
	let allTopics = [];

	function loadTags() {
		$.get('/api/category/5', function (data) {
			allTopics = data.topics;

			allTopics.forEach(topic => {
				const tag = topic.courseTag;
				const tid = topic.tid;

				if (!tagToTidMap[tag]) {
					tagToTidMap[tag] = [];
				}
				tagToTidMap[tag].push(tid);
			});

			const uniqueTags = Object.keys(tagToTidMap);
			uniqueTags.sort();
			uniqueTags.forEach(function (tag) {
				$('#tag-list').append(`<li><a class="dropdown-item" href="#" data-tag="${tag}">${tag}</a></li>`);
			});



		}).fail(function () {
			alert("Error.");
		});
	}

	loadTags();

	$(document).on('click', '.dropdown-item', function (e) {

		const selectedTag = $(this).data('tag');
		$('#selectedTagLabel').text(selectedTag ? selectedTag : "All Courses");

		if (selectedTag) {
			const tids = tagToTidMap[selectedTag];
			const filteredTopics = allTopics.filter(topic => tids.includes(topic.tid));
			const $topicsContainer = $('ul[component="category"].topics-list');
			$topicsContainer.empty()
			renderTopics(filteredTopics);
		} else {
			const $topicsContainer = $('ul[component="category"].topics-list');
			$topicsContainer.empty()
			renderTopics(allTopics);
		}
	});

	function renderTopics(topics) {
		const $topicsContainer = $('#topics-container ul');
		$topicsContainer.empty();
		if (topics.length === 0) {
			$topicsContainer.append('<p>No se encontraron tópicos para esta etiqueta.</p>');
			return;
		}

		const topicsHtml = topics.map(topic => {
			return `
                <li component="category/topic" class="category-item hover-parent border-bottom py-3 py-lg-4 d-flex flex-column flex-lg-row align-items-start">
                    <div class="d-flex p-0 col-12 col-lg-7 gap-2 gap-lg-3 pe-1 align-items-start">
                        <div class="flex-shrink-0 position-relative">
                            <a class="text-decoration-none" href="${topic.user.userslug ? `${config.relative_path}/user/${topic.user.userslug}` : '#'}">
                                <i class="fas fa-star" style="font-size: 40px; color: blue;"></i>
                            </a>
                        </div>
                        <div class="flex-grow-1 d-flex flex-wrap gap-1 position-relative">
                            <span component="topic/courseTag" class="badge bg-light text-primary border border-gray-300 ">#${topic.courseTag}</span>
                            <h3 component="topic/header" class="title text -break fs-5 fw-semibold m-0 tracking-tight w-100">
                                <a class="text-reset" href="${config.relative_path}/topic/${topic.slug}">${topic.title}</a>
                            </h3>
                            <span component="topic/post-count" class="badge border border-gray-300 text-body">
                                <i class="fa-regular fa-fw fa-message"></i>
                                Filtered
                            </span>
                        </div>
                    </div>
                </li>
            `;
		}).join('');

		$topicsContainer.append(topicsHtml);
		console.log("Tópicos renderizados:", topics);
	}

	$(document).on('click', '#questions-and-answers-tab', function () {
		loadTags();
	});

	$(window).on('popstate', function () {
		loadTags();
	});
});