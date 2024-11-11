export default function displayUserQuestions(questions) {
	const questionsContainer = document.getElementById('questions-container');
	questionsContainer.style.display = 'block';
	questionsContainer.innerHTML = '';

	if (!questions || questions.length === 0) {
		// Mensaje si no hay preguntas o si hubo un error
		questionsContainer.innerHTML = '<div class="alert alert-info" role="alert">No tienes preguntas aún. ¡Anímate a realizar una pregunta ahora!</div>';
		return;
	}

	questions.forEach((question) => {
		const card = document.createElement('div');

		// Convertir lastposttimeISO a un objeto Date
		const lastPostDate = new Date(question.lastposttimeISO);
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		};
		const formattedDate = lastPostDate.toLocaleString('es-ES', options);

		// Contenido de la tarjeta con enlace a la pregunta
		card.innerHTML = `
		<h6><a href="/topic/${question.tid}" style="text-decoration: none; color: #007bff;">${question.title}</a></h6>
		<p style="color: #999; font-size: 0.9em;">Creada el: ${formattedDate}</p>`;
		questionsContainer.appendChild(card);
	});
}
