export default function ResultButton({ title, correct = false, selected = false }) {
	let buttonClasses = 'text-xl px-5 py-3 rounded-md transition-colors duration-150';
	if (correct) {
		buttonClasses += ' bg-green-700 hover:bg-green-600';
	} else if (selected && !correct) {
		buttonClasses += ' bg-red-700 hover:bg-red-600';
	} else {
		buttonClasses += ' bg-violet-700 hover:bg-violet-800';
	}

	return <button className={buttonClasses}>{title}</button>;
}
