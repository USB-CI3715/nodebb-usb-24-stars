'use strict';

define('composer/getSimilarQuestions', [], function () {
	const getSimilarQuestions = {};

	getSimilarQuestions.fetchSimilarQuestions = async function (inputTitleQuestion) {
		// se obtiene la categoria con cid = 5 que es Questions & Answers
		let allQuestions;
		try {
			const response = await $.getJSON(`/api/category/5`);
			allQuestions = response;
		} catch (error) {
			console.error('Error al obtener las preguntas: ', error);
		}

		// se guardan las preguntas o topicos en allQuestions
		allQuestions = allQuestions.topics;

		// si no hay topicos, se retorna un array vacio
		if (allQuestions.length === 0) {
			return [];
		}

		// aqui se comparan las palabras del titulo de la pregunta actual con las palabras de los titulos de
		// preguntas anteriores

		// funcion para eliminar los acentos, convertirlos en minusculas
		// y eliminar los caracteres especiales
		const NormalizeWords = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]/gi, '');

		const inputTitleQuestionWords = NormalizeWords(inputTitleQuestion).split(' ').map(word => word.toLowerCase());
		const similarResults = allQuestions.filter((topic) => {
			const topicWords = NormalizeWords(topic.title).split(' ').map(word => word.toLowerCase());
			const commonWords = topicWords.filter(word => inputTitleQuestionWords.includes(word));
			// si existe al menos una palabra en comun, se agrega a los resultados
			// agregar tambien la longitud de las palabras en comun para poder ordenar los resultados
			topic.commonWordsCount = commonWords.length;
			return commonWords.length > 0;
		});

		// ordenar los resultados por la cantidad de palabras en comun
		similarResults.sort((a, b) => b.commonWordsCount - a.commonWordsCount);

		// solo filtrar los primeros 3 resultados
		similarResults.splice(3);
		return similarResults;
	};

	return getSimilarQuestions;
});
