import QuizButton from './QuizButton';
import { useContext } from 'react';
import { QuizContext } from '../app/quiz';
import { QUIZ_DATA } from '../app/data';

export default function QuizPage() {
	const { category, currentQuestion, functions } = useContext(QuizContext);
	const { finishGame, nextQuestion, previousQuestion } = functions;

	const currentCategoryData = QUIZ_DATA.find(quiz => quiz.category === category);
	const currentQuestionData = currentCategoryData.questions[currentQuestion];
	const correctAnswers = currentCategoryData.questions.map(question => question.answer);

	const isLastQuestion = currentQuestion + 1 === currentCategoryData.questions.length;

	const buttonClasses =
		'text-xl flex gap-3 items-center px-5 py-3 bg-fuchsia-700 hover:bg-fuchsia-800 rounded-md transition-colors duration-150';
	const nextButtonContent = (
		<>
			<i className="fa-solid fa-chevron-right"></i>
			<p>Next</p>
		</>
	);
	const finishButtonContent = (
		<>
			<i className="fa-solid fa-check"></i>
			<p>Finish</p>
		</>
	);

	return (
		<section className="flex flex-col justify-center h-full gap-5 text-white w-2/6 mx-auto">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold text-center">{category} Quiz</h1>
				<button
					onClick={() => finishGame(false)}
					className="text-xl flex gap-3 items-center px-5 py-3 bg-fuchsia-700 hover:bg-fuchsia-800 rounded-md transition-colors duration-150">
					<i className="fa-solid fa-house"></i>
					<p>Home</p>
				</button>
			</div>

			<div className="flex flex-col gap-5 pt-2">
				<label className="text-2xl">{currentQuestionData.question}</label>
				{currentQuestionData.possibleAnswers.map((answer, index) => {
					return <QuizButton key={index} title={answer} />;
				})}
			</div>

			<div className="flex justify-between items-center">
				<p className="text-xl pt-5">
					Question {currentQuestion + 1} out of {currentCategoryData.questions.length}
				</p>
				<div className="flex gap-4">
					{currentQuestion > 0 && (
						<button onClick={previousQuestion} className={buttonClasses}>
							<i className="fa-solid fa-chevron-left"></i>
							<p>Previous</p>
						</button>
					)}
					<button onClick={isLastQuestion ? () => finishGame(true, correctAnswers) : nextQuestion} className={buttonClasses}>
						{currentQuestion + 1 === 4 ? finishButtonContent : nextButtonContent}
					</button>
				</div>
			</div>
		</section>
	);
}
