// Función para mostrar las preguntas o el mensaje correspondiente del filtro de búsqueda
export default function displaySearchResults(matchingTopics) {
	const resultsContainer = $('#search-results');
	const resultsContainerFiltro = $('#questions-container');
	resultsContainer.empty();
	resultsContainerFiltro.empty();

	if (matchingTopics.length > 0) {
		const html = matchingTopics.map(topic => `
			<li component="category/topic" class="category-item hover-parent border-bottom py-3 py-lg-4 d-flex flex-column flex-lg-row align-items-start">
				<div class="flex-grow-1 d-flex flex-wrap gap-1 position-relative">
					<span component="topic/courseTag" class="badge bg-light text-primary border border-gray-300 ">#${topic.courseTag}</span>
					<h3 component="topic/header"  class="title text -break fs-5 fw-semibold m-0 tracking-tight w-100">
						<a class="text-reset" href="${config.relative_path}/topic/${topic.slug}">${topic.title}</a>
					</h3>
					
				</div>
			</li>
		`).join('');

		resultsContainer.append(html);
	} else {
		resultsContainer.append('<div>No results found.</div>');
	}
}
