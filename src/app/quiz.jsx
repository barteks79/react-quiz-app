import { createContext } from 'react';

export const QuizContext = createContext({
	category: undefined,
	currentQuestion: 0,
	selectedAnswer: undefined,
	isGameStarted: false,
	isModalShown: false,
	isResultShown: false,
	points: 0,
	userAnswers: [],
	functions: {
		startNewGame: () => {},
		finishGame: () => {},
		selectCategory: () => {},
		selectAnswer: () => {},
		nextQuestion: () => {},
		previousQuestion: () => {},
		closeModal: () => {},
	},
});
