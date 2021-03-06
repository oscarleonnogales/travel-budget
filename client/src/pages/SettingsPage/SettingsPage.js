import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './SettingsPage.css';
import Navbar from '../../components/Navbar/Navbar';
import PersonalInformationForm from './components/PersonInformationForm';
import HomeCurrencyForm from './components/HomeCurrencyForm';
import PasswordChangeForm from './components/PasswordChangeForm';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import CategoriesForm from './components/CategoriesForm';

export const MessageContext = React.createContext();

export default function SettingsPage() {
	const authData = useSelector((state) => state.authData);
	const [message, setMessage] = useState();

	const changeMessage = (newMessage) => {
		setMessage(newMessage);
	};

	const messageContexValue = {
		message,
		changeMessage,
	};

	return (
		<>
			<Navbar></Navbar>
			<main className="main-page-content">
				<ErrorMessage />
				<div className={`success-message-container ${message ? 'active' : ''}`}>
					{message}
					<button type="button" className="close-success-btn" onClick={() => setMessage(null)}>
						&times;
					</button>
				</div>
				<MessageContext.Provider value={messageContexValue}>
					{authData?.user?.firstName && <PersonalInformationForm />}
					<HomeCurrencyForm />
					<CategoriesForm />
					{authData?.user?.firstName && <PasswordChangeForm />}
				</MessageContext.Provider>
			</main>
		</>
	);
}
