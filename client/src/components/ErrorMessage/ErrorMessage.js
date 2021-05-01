import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../redux/actions/error';
import './ErrorMessage.css';

export default function ErrorMessage() {
	const dispatch = useDispatch();
	const error = useSelector((state) => state.error);

	// if (!error) return null;

	const close = () => {
		dispatch(clearError());
	};

	return (
		<div className={`error-message-container ${error ? 'active' : ''}`}>
			{error}
			{error && (
				<button onClick={close} className="close-error-btn">
					Close
				</button>
			)}
		</div>
	);
}
