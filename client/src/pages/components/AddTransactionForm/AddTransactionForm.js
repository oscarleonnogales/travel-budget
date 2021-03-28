import React, { Component } from 'react';
import axios from 'axios';
import './AddTransactionForm.css';

export class AddTransactionForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: '',
			description: '',
			amount: '',
			currency: '',
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { date, description, amount, currency } = this.state;
		axios
			.post(`${process.env.REACT_APP_SERVER_URI}/transactions`, { date, description, amount, currency })
			.then((res) => {
				console.log(res);
				this.clearForm();
			});
	};

	clearForm = () => {
		this.setState({
			date: '',
			description: '',
			amount: '',
			currency: '',
		});
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label htmlFor="date">Date</label>
				<input type="date" name="date" value={this.state.date} onChange={this.handleChange}></input>
				<label htmlFor="description">Description</label>
				<input type="text" name="description" value={this.state.description} onChange={this.handleChange}></input>
				<label htmlFor="amount">Amount</label>
				<input type="number" name="amount" step="0.01" value={this.state.amount} onChange={this.handleChange}></input>
				<label htmlFor="currency">Currency</label>
				<input type="text" name="currency" value={this.state.currency} onChange={this.handleChange}></input>
				<button type="submit">Add Transaction</button>
			</form>
		);
	}
}

export default AddTransactionForm;
