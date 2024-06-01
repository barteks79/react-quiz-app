import QuizButton from './QuizButton';
import ResultButton from './ResultButton';
import { useContext } from 'react';
import { QuizContext } from '../app/quiz';
import { QUIZ_DATA } from '../app/data';

export default function ResultPage() {
	const { category, userAnswers, functions, points } = useContext(QuizContext);
	const { finishGame } = functions;

	const currentCategoryData = QUIZ_DATA.find(quiz => quiz.category === category);

	return (
		<section className="flex flex-col h-full gap-5 text-white w-5/12 mx-auto pt-20">
			<div className="flex justify-between items-center pb-2">
				<h1 className="text-3xl font-bold text-center">Results of {category} quiz</h1>
				<button
					onClick={() => finishGame(false)}
					className="text-xl flex gap-3 items-center px-5 py-3 bg-fuchsia-700 hover:bg-fuchsia-800 rounded-md transition-colors duration-150">
					<i className="fa-solid fa-house"></i>
					<p>Home</p>
				</button>
			</div>
			<div className="flex flex-col gap-5 pb-20">
				{currentCategoryData.questions.map((question, index) => {
					return (
						<div key={index} className="flex flex-col gap-3 pt-6 border-t border-zinc-400 rounded-sm">
							<div className="flex justify-between">
								<label className="text-xl">{question.question}</label>
								<p className="text-xl">{userAnswers[index] === question.answer ? 1 : 0}/1 pts</p>
							</div>
							{question.possibleAnswers.map((answer, index2) => {
								return (
									<ResultButton
										title={answer}
										correct={question.answer === answer}
										key={(index2 + 1) * ((index + 0.13 * index2) * 1.3478)}
										selected={userAnswers[index] === answer}
									/>
								);
							})}
						</div>
					);
				})}
			</div>
			<div className="flex justify-center pb-20">
				<h1 className="uppercase font-bold text-3xl">
					Congratulations! You scored {points}/{currentCategoryData.questions.length}!
				</h1>
			</div>
		</section>
	);
}
