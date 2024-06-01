import { useContext } from 'react';
import { QuizContext } from '../app/quiz';

export default function QuizButton({ title, isCategory = false }) {
	const { functions, category, selectedAnswer } = useContext(QuizContext);
	const { selectCategory, selectAnswer } = functions;

	let isActive;
	isCategory ? (isActive = category === title) : (isActive = selectedAnswer === title);

	const buttonClasses = 'text-xl px-5 py-3 rounded-md transition-colors duration-150';

	return (
		<button
			onClick={isCategory ? () => selectCategory(title) : () => selectAnswer(title)}
			className={
				isActive ? buttonClasses + ' bg-green-700 hover:bg-green-600' : buttonClasses + ' bg-violet-700 hover:bg-violet-800'
			}>
			{title}
		</button>
	);
}
