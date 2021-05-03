import React from 'react';
import { useSelector } from 'react-redux';
import './SettingsPage.css';
import Navbar from '../../components/Navbar/Navbar';
import PersonalInformationForm from './components/PersonInformationForm';
import UserSettingsForm from './components/UserSettingsForm';
import PasswordChangeForm from './components/PasswordChangeForm';

export default function SettingsPage() {
	const authData = useSelector((state) => state.authData);

	return (
		<>
			<Navbar></Navbar>
			<main className="main-page-content">
				<PersonalInformationForm />
				<UserSettingsForm />
				{authData?.user?.givenName && <PasswordChangeForm />}
			</main>
		</>
	);
}
