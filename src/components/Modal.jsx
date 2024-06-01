import { createPortal } from 'react-dom';
import { forwardRef, useImperativeHandle, useContext, useRef } from 'react';
import { QuizContext } from '../app/quiz';

const Modal = forwardRef(function Modal({ option }, ref) {
	const { isModalShown, functions } = useContext(QuizContext);
	const { closeModal } = functions;
	const dialogRef = useRef();

	useImperativeHandle(
		ref,
		() => {
			return {
				open() {
					dialogRef.current.showModal();
				},
				close() {
					dialogRef.current.close();
				},
			};
		},
		[]
	);

	const modalClasses =
		'flex-col items-center justify-around w-3/12 h-1/6 p-6 box-content rounded-lg shadow-lg shadow-grey-800';

	return createPortal(
		<dialog ref={dialogRef} className={isModalShown ? modalClasses + ' flex' : modalClasses} onClose={closeModal}>
			<p className="text-xl font-semibold uppercase">Select {option}</p>
			<button
				onClick={closeModal}
				className="text-white text-xl flex gap-3 items-center px-5 py-3 bg-fuchsia-700 hover:bg-fuchsia-800 rounded-md transition-colors duration-150 w-4/6">
				<p className="text-center w-full">Close</p>
			</button>
		</dialog>,
		document.getElementById('modal')
	);
});

export default Modal;
