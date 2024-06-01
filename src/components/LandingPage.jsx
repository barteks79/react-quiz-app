import QuizButton from './QuizButton';
import { useContext } from 'react';
import { QuizContext } from '../app/quiz';
import { QUIZ_DATA } from '../app/data';

export default function LandingPage() {
	const { functions } = useContext(QuizContext);
	const { startGame } = functions;

	return (
		<section className="flex flex-col justify-center h-full gap-5 text-white w-2/6 mx-auto">
			<h1 className="text-5xl font-bold pb-6 text-center">Quiz App</h1>
			<label className="text-2xl">Select your quiz:</label>
			<div className="flex flex-col gap-5">
				{QUIZ_DATA.map((quiz, index) => {
					return <QuizButton key={index} title={quiz.category} isCategory={true} />;
				})}
			</div>
			<button
				onClick={startGame}
				className="text-xl bg-fuchsia-700 hover:bg-fuchsia-800  px-5 py-4 rounded-md mt-5 transition-colors duration-150">
				Start Game
			</button>
		</section>
	);
}
