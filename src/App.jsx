import { useState, useRef } from 'react';
import { QuizContext } from './app/quiz';
import LandingPage from './components/LandingPage';
import QuizPage from './components/QuizPage';
import Modal from './components/Modal';
import ResultPage from './components/ResultPage';

function App() {
	const [quizData, setQuizData] = useState({
		category: undefined,
		currentQuestion: 0,
		selectedAnswer: undefined,
		isGameStarted: false,
		isModalShown: false,
		isResultShown: false,
		points: 0,
		userAnswers: [],
	});

	const modal = useRef();

	const handleSelectCategory = category => {
		setQuizData(prevQuizData => {
			return { ...prevQuizData, category };
		});
	};

	const handleSelectAnwer = answer => {
		setQuizData(prevQuizData => {
			return { ...prevQuizData, selectedAnswer: answer };
		});
	};

	const handleStartGame = () => {
		// if user select category, the game will start, otherwise the modal will be shown
		if (quizData.category) {
			setQuizData(prevQuizData => {
				return { ...prevQuizData, isGameStarted: true };
			});
		} else {
			handleOpenModal();
		}
	};

	const handleShowResult = () => {
		// made for controling displayed page content
		setQuizData(prevQuizData => {
			return { ...prevQuizData, isResultShown: true };
		});
	};

	const resetChoices = () => {
		// reset choices to default
		setQuizData(prevQuizData => {
			return { ...prevQuizData, selectedAnswer: undefined, currentQuestion: 0, category: undefined, userAnswers: [] };
		});
	};

	const handleCloseResult = () => {
		resetChoices();
		// made for controling displayed page content
		setQuizData(prevQuizData => {
			return { ...prevQuizData, isResultShown: false, points: 0 };
		});
	};

	const handleFinishGame = (showResult, correctAnswers) => {
		if (!quizData.selectedAnswer && showResult) {
			handleOpenModal();
			return;
		}
		showResult && addUserAnswer(correctAnswers);
		// if user finish quiz early, the result won't be shown
		showResult ? handleShowResult() : handleCloseResult();
		setQuizData(prevQuizData => {
			return { ...prevQuizData, isGameStarted: false };
		});
	};

	const handleNextQuestion = () => {
		// if user select answer, next question will show up, if not, the modal will be shown
		if (quizData.selectedAnswer) {
			addUserAnswer(false);
			// count points when user click Next button
			setQuizData(prevQuizData => {
				return {
					...prevQuizData,
					currentQuestion: prevQuizData.currentQuestion + 1,
					selectedAnswer: prevQuizData.userAnswers[prevQuizData.currentQuestion + 1],
				};
			});
		} else {
			handleOpenModal();
		}
	};

	const handlePreviousQuestion = () => {
		setQuizData(prevQuizData => {
			return {
				...prevQuizData,
				currentQuestion: prevQuizData.currentQuestion - 1,
				selectedAnswer: prevQuizData.userAnswers[prevQuizData.currentQuestion - 1],
			};
		});
	};

	const addUserAnswer = correctAnswers => {
		setQuizData(prevQuizData => {
			const updatedAnswers = [...prevQuizData.userAnswers];
			updatedAnswers[prevQuizData.currentQuestion] = prevQuizData.selectedAnswer;
			if (updatedAnswers.length === 4) addPoints(correctAnswers, updatedAnswers);
			return { ...prevQuizData, userAnswers: updatedAnswers };
		});
	};

	const addPoints = (correctAnswers, userAnswers) => {
		// comparing correct answers with user answers
		const correctUserAnswers = correctAnswers.filter((answer, index) => answer === userAnswers[index]);
		const pointsEarned = correctUserAnswers.length;
		setQuizData(prevQuizData => {
			return { ...prevQuizData, points: pointsEarned };
		});
	};

	const handleOpenModal = () => {
		modal.current.open();
		setQuizData(prevQuizData => {
			return { ...prevQuizData, isModalShown: true };
		});
	};

	const handleCloseModal = () => {
		modal.current && modal.current.close();
		setQuizData(prevQuizData => {
			return { ...prevQuizData, isModalShown: false };
		});
	};

	const contextValue = {
		...quizData,
		functions: {
			startGame: handleStartGame,
			finishGame: handleFinishGame,
			selectCategory: handleSelectCategory,
			selectAnswer: handleSelectAnwer,
			nextQuestion: handleNextQuestion,
			closeModal: handleCloseModal,
			previousQuestion: handlePreviousQuestion,
		},
	};

	// made for controling displayed page content
	let pageContent;

	if (quizData.isGameStarted && !quizData.isResultShown) {
		pageContent = <QuizPage />;
	} else if (!quizData.isGameStarted && !quizData.isResultShown) {
		pageContent = <LandingPage />;
	} else if (quizData.isResultShown && !quizData.isGameStarted) {
		pageContent = <ResultPage />;
	}

	return (
		<QuizContext.Provider value={contextValue}>
			<Modal ref={modal} option={quizData.isGameStarted ? 'answer' : 'category'} />
			{pageContent}
		</QuizContext.Provider>
	);
}

export default App;
