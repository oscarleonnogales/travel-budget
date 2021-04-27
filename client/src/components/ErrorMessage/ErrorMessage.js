import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../redux/actions/error';
import './ErrorMessage.css';

export default function ErrorMessage(rror) {
	const dispatch = useDispatch();
	const error = useSelector((state) => state.error);

	if (!error) return null;

	const close = () => {
		dispatch(clearError());
	};

	return (
		<div className="error-message-container">
			{error}
			<button onClick={close}>&times;</button>
		</div>
	);
}
